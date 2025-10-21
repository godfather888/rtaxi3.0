import { InjectPubSub } from "@ptc-org/nestjs-query-graphql";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommonCouponService } from "../coupon/common-coupon.service";
import { CouponEntity } from "../entities/coupon.entity";
import { DriverDeductTransactionType } from "../entities/enums/driver-deduct-transaction-type.enum";
import { DriverRechargeTransactionType } from "../entities/enums/driver-recharge-transaction-type.enum";
import { DriverStatus } from "../entities/enums/driver-status.enum";
import { PaymentStatus } from "../entities/enums/payment-status.enum";
import { ProviderRechargeTransactionType } from "../entities/enums/provider-recharge-transaction-type.enum";
import { RequestActivityType } from "../entities/enums/request-activity-type.enum";
import { RiderDeductTransactionType } from "../entities/enums/rider-deduct-transaction-type.enum";
import { ServiceOptionType } from "../entities/enums/service-option-type.enum";
import { ServicePaymentMethod } from "../entities/enums/service-payment-method.enum";
import { TransactionAction } from "../entities/enums/transaction-action.enum";
import { TransactionStatus } from "../entities/enums/transaction-status.enum";
import { PaymentEntity } from "../entities/payment.entity";
import { RequestActivityEntity } from "../entities/taxi/request-activity.entity";
import { ServiceOptionEntity } from "../entities/taxi/service-option.entity";
import { ZonePriceEntity } from "../entities/taxi/zone-price.entity";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { In, Repository } from "typeorm";
import { HttpService } from "@nestjs/axios";

import { OrderStatus } from "../entities/enums/order-status.enum";
import { TaxiOrderEntity } from "../entities/taxi/taxi-order.entity";
import { ServiceCategoryEntity } from "../entities/taxi/service-category.entity";
import { Point } from "../interfaces/point";
import {
  DriverLocationWithId,
  DriverRedisService,
} from "../redis/driver-redis.service";
import { OrderRedisService } from "../redis/order-redis.service";
import { DriverNotificationService } from "./firebase-notification-service/driver-notification.service";
import { RiderNotificationService } from "./firebase-notification-service/rider-notification.service";
import { GoogleServicesService } from "./google-services/google-services.service";
import { RegionService } from "./region/region.service";
import { ServiceService } from "./service.service";
import { SharedDriverService } from "./shared-driver.service";
import { SharedFleetService } from "./shared-fleet.service";
import { SharedProviderService } from "./shared-provider.service";
import { SharedRiderService } from "./shared-rider.service";
import { firstValueFrom } from "rxjs";
import { ForbiddenError } from "@nestjs/apollo";
import { PaymentMode } from "../entities/enums/payment-mode.enum";
import { SharedCustomerWalletService } from "../customer-wallet/shared-customer-wallet.service";
import { TaxiOrderType } from "../entities/taxi/enums/taxi-order-type.enum";

@Injectable()
export class SharedOrderService {
  constructor(
    @InjectRepository(TaxiOrderEntity)
    private orderRepository: Repository<TaxiOrderEntity>,
    @InjectRepository(RequestActivityEntity)
    private activityRepository: Repository<RequestActivityEntity>,
    private regionService: RegionService,
    @InjectRepository(ServiceCategoryEntity)
    private serviceCategoryRepository: Repository<ServiceCategoryEntity>,
    @InjectRepository(ServiceOptionEntity)
    private serviceOptionRepository: Repository<ServiceOptionEntity>,
    @InjectRepository(ZonePriceEntity)
    private zonePriceRepository: Repository<ZonePriceEntity>,
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
    private googleServices: GoogleServicesService,
    private servicesService: ServiceService,
    private riderService: SharedRiderService,
    private sharedRiderWalletService: SharedCustomerWalletService,
    private driverRedisService: DriverRedisService,
    private orderRedisService: OrderRedisService,
    private driverService: SharedDriverService,
    private sharedProviderService: SharedProviderService,
    private sharedFleetService: SharedFleetService,
    private commonCouponService: CommonCouponService,
    @InjectPubSub()
    private pubSub: RedisPubSub,
    private driverNotificationService: DriverNotificationService,
    private riderNotificationService: RiderNotificationService,
    private httpService: HttpService
  ) {}

  async getZonePricingsForPoints(
    from: Point,
    to: Point
  ): Promise<ZonePriceEntity[]> {
    let pricings: ZonePriceEntity[] = await this.zonePriceRepository.query(
      "SELECT * FROM zone_price WHERE ST_Within(st_geomfromtext('POINT(? ?)'), `from`) AND ST_Within(st_geomfromtext('POINT(? ?)'), `to`)",
      [from.lng, from.lat, to.lng, to.lat]
    );
    pricings = await this.zonePriceRepository.find({
      where: { id: In(pricings.map((p) => p.id)) },
      relations: { services: true, fleets: true },
    });
    return pricings;
  }

  async calculateFare(input: {
    points: Point[];
    twoWay?: boolean;
    coupon?: CouponEntity;
    riderId: number;
    waitTime?: number;
    selectedOptionIds?: string[];
    orderType: TaxiOrderType;
  }) {
    Logger.log(input, "SharedOrderService.calculateFare.input");
    let zonePricings: ZonePriceEntity[] = [];
    if (input.points.length == 2) {
      zonePricings = await this.getZonePricingsForPoints(
        input.points[0],
        input.points[1]
      );
    }
    const regions = await this.regionService.getRegionWithPoint(
      input.points[0]
    );
    if (regions.length < 1) {
      throw new ForbiddenError(CalculateFareError.RegionUnsupported);
    }
    const servicesInRegion = await this.regionService.getRegionServices(
      regions[0].id
    );
    if (servicesInRegion.length < 1) {
      throw new ForbiddenError(CalculateFareError.NoServiceInRegion);
    }
    if ((input.twoWay ?? false) && input.points.length > 1) {
      input.points.push(input.points[0]);
    }
    const metrics =
      servicesInRegion.findIndex((x) => x.perHundredMeters > 0) > -1
        ? await this.googleServices.getSumDistanceAndDuration(input.points)
        : { distance: 0, duration: 0, directions: [] };
    const cats = await this.serviceCategoryRepository.find({
      relations: {
        services: {
          media: true,
          options: true,
        },
      },
    });
    const feeMultiplier =
      await this.sharedFleetService.getFleetMultiplierInPoint(input.points[0]);
    const _cats = cats
      .map((cat) => {
        const { services, ..._cat } = cat;

        const _services = services
          .filter(
            (x) => servicesInRegion.filter((y) => y.id == x.id).length > 0
          )
          .filter((x) => x.orderTypes.includes(input.orderType))
          .map((service) => {
            let cost = 0;
            const zonePricesWithService = zonePricings.filter((zone) =>
              zone.services.find((_service) => _service.id == service.id)
            );
            if (zonePricesWithService.length > 0) {
              cost = zonePricesWithService[0].cost;
              const eta = new Date();
              for (const _multiplier of zonePricesWithService[0]
                .timeMultipliers) {
                const startMinutes =
                  parseInt(_multiplier.startTime.split(":")[0]) * 60 +
                  parseInt(_multiplier.startTime.split(":")[1]);
                const nowMinutes = eta.getHours() * 60 + eta.getMinutes();
                const endMinutes =
                  parseInt(_multiplier.endTime.split(":")[0]) * 60 +
                  parseInt(_multiplier.endTime.split(":")[1]);
                if (nowMinutes >= startMinutes && nowMinutes <= endMinutes) {
                  cost *= _multiplier.multiply;
                }
              }
            } else {
              cost = this.servicesService.calculateCost(
                service,
                metrics.distance,
                metrics.duration,
                new Date(),
                feeMultiplier,
                false
              );
            }
            const waitFee = service.perMinuteWait * (input.waitTime ?? 0);
            if (input.coupon == null) {
              return {
                ...service,
                cost: cost + waitFee,
              };
            } else {
              const costAfterCoupon =
                this.commonCouponService.applyCouponOnPrice(
                  input.coupon,
                  cost + waitFee
                );
              return {
                ...service,
                cost: cost + waitFee,
                costAfterCoupon,
              };
            }
          });
        return {
          ..._cat,
          services: _services,
        };
      })
      .filter((x) => x.services.length > 0);
    Logger.log(_cats, "SharedOrderService.calculateFare.cats");
    Logger.log(metrics, "SharedOrderService.calculateFare.metrics");
    if (_cats.length == 0) {
      throw new ForbiddenError(CalculateFareError.NoServiceInRegion);
    }

    return {
      ...metrics,
      currency: regions[0].currency,
      services: _cats,
    };
  }

  async createOrder(input: {
    riderId?: number;
    serviceId: number;
    intervalMinutes: number;
    points: Point[];
    addresses: string[];
    operatorId?: number;
    twoWay?: boolean;
    optionIds?: string[];
    couponCode?: string;
    fleetId?: number;
    paymentMode?: PaymentMode;
    paymentMethodId?: number;
    waitMinutes: number;
    driverId?: number;
  }): Promise<TaxiOrderEntity> {
    Logger.log(input, "SharedOrderService.createOrder.input");
    let zonePricings: ZonePriceEntity[] = [];
    if (input.points.length == 2) {
      zonePricings = await this.getZonePricingsForPoints(
        input.points[0],
        input.points[1]
      );
    }
    const service = await this.servicesService.getWithId(input.serviceId);
    if (service == undefined) {
      throw new ForbiddenError("SERVICE_NOT_FOUND");
    }
    const closeDrivers = await this.driverRedisService.getClose(
      input.points[0],
      service.searchRadius
    );
    Logger.log(closeDrivers, "SharedOrderService.createOrder.closeDrivers");
    const driverIds = closeDrivers.map((x: DriverLocationWithId) => x.driverId);
    const fleetIdsInPoint = await this.sharedFleetService.getFleetIdsInPoint(
      input.points[0]
    );
    const driversWithService =
      await this.driverService.getOnlineDriversWithServiceId(
        driverIds,
        input.serviceId,
        fleetIdsInPoint
      );
    let optionFee = 0;
    let options: ServiceOptionEntity[] = [];
    if (input.optionIds != null) {
      options = await this.serviceOptionRepository.findByIds(input.optionIds);
      if ((input.twoWay ?? false) && input.points.length > 1) {
        input.points.push(input.points[0]);
        input.addresses.push(input.addresses[0]);
      }
      const paidOptions = options.filter(
        (option) => option.type == ServiceOptionType.Paid
      );
      optionFee =
        paidOptions.length == 0
          ? 0
          : paidOptions
              .map((option) => option.additionalFee ?? 0)
              .reduce(
                (previous: number, current: number) => (current += previous)
              );
    }
    const metrics =
      service.perHundredMeters > 0
        ? await this.googleServices.getSumDistanceAndDuration(input.points)
        : { distance: 0, duration: 0, directions: [] };
    const eta = new Date(
      new Date().getTime() + (input.intervalMinutes | 0) * 60 * 1000
    );
    const rider =
      input.riderId == null
        ? null
        : await this.riderService.repo.findOneBy({ id: input.riderId });
    const isResident = rider?.isResident ?? process.env.MOTAXI == null;
    const feeMultiplier =
      fleetIdsInPoint.length == 0
        ? 1
        : ((await this.sharedFleetService.getFleetById(fleetIdsInPoint[0]))
            ?.feeMultiplier ?? 1);
    let cost = this.servicesService.calculateCost(
      service,
      metrics.distance,
      metrics.duration,
      eta,
      feeMultiplier,
      isResident
    );
    optionFee + service.perMinuteWait * (input.waitMinutes ?? 0);
    const zonePricing = zonePricings.filter((price) => {
      return (
        price.services.filter((service) => service.id == input.serviceId)
          .length > 0
      );
    });
    Logger.log(zonePricing, "SharedOrderService.createOrder.zonePricing");
    if (zonePricing.length > 0) {
      cost = zonePricing[0].cost;
      const eta = new Date();
      for (const _multiplier of zonePricings[0].timeMultipliers) {
        const startMinutes =
          parseInt(_multiplier.startTime.split(":")[0]) * 60 +
          parseInt(_multiplier.startTime.split(":")[1]);
        const nowMinutes = eta.getHours() * 60 + eta.getMinutes();
        const endMinutes =
          parseInt(_multiplier.endTime.split(":")[0]) * 60 +
          parseInt(_multiplier.endTime.split(":")[1]);
        if (nowMinutes >= startMinutes && nowMinutes <= endMinutes) {
          cost *= _multiplier.multiply;
        }
      }
    }

    const regions = await this.regionService.getRegionWithPoint(
      input.points[0]
    );
    Logger.log(regions, "SharedOrderService.createOrder.regions");

    if (
      service.maximumDestinationDistance != 0 &&
      metrics.distance > service.maximumDestinationDistance
    ) {
      throw new ForbiddenError("DISTANCE_TOO_FAR");
    }
    let shouldPrePay = false;
    const paidAmount = 0;
    if (service.prepayPercent > 0 && input.riderId != null) {
      const balance =
        await this.sharedRiderWalletService.getRiderCreditInCurrency(
          input.riderId,
          regions[0].currency
        );
      const amountNeedsToBePrePaid = (cost * service.prepayPercent) / 100;
      if (balance < amountNeedsToBePrePaid) {
        shouldPrePay = true;
      } else {
        // await this.riderService.rechargeWallet({
        //     amount: -amountNeedsToBePrePaid,
        //     currency: regions[0].currency,
        //     action: TransactionAction.Deduct,
        //     deductType: RiderDeductTransactionType.OrderFee,
        //     status: TransactionStatus.Done,
        //     riderId: input.riderId
        // });
        // paidAmount = amountNeedsToBePrePaid;
      }
    }
    Logger.log(`shouldPrePay: ${shouldPrePay}`, "createOrder");
    Logger.log(`cost: ${cost}`, "createOrder");
    Logger.log(`paidAmount: ${paidAmount}`, "createOrder");
    Logger.log(`optionFee: ${optionFee}`, "createOrder");
    Logger.log(`eta: ${eta}`, "createOrder");

    const orderObject: TaxiOrderEntity = this.orderRepository.create({
      serviceId: input.serviceId,
      currency: regions[0].currency,
      riderId: input.riderId,
      points: input.points,
      addresses: input.addresses.map((address) => address.replace(", ", "-")),
      distanceBest: metrics.distance,
      durationBest: metrics.duration,
      directions: metrics.directions,
      paymentMode: input.paymentMode,
      driverId: input.driverId,
      savedPaymentMethodId:
        input.paymentMode == PaymentMode.SavedPaymentMethod
          ? input.paymentMethodId!
          : undefined,
      paymentGatewayId:
        input.paymentMode == PaymentMode.PaymentGateway
          ? input.paymentMethodId!
          : undefined,
      status: shouldPrePay
        ? OrderStatus.WaitingForPrePay
        : input.intervalMinutes > 30
          ? OrderStatus.Booked
          : driversWithService.length < 1
            ? OrderStatus.NoCloseFound
            : OrderStatus.Requested,
      paidAmount: paidAmount,
      costBest: cost,
      costAfterCoupon: cost,
      expectedTimestamp: eta,
      operatorId: input.operatorId,
      waitMinutes: input.waitMinutes ?? 0,
      waitCost: service.perMinuteWait * (input.waitMinutes ?? 0),
      rideOptionsCost: optionFee,
      fleetId: input.fleetId,
      providerShare:
        service.providerShareFlat + (service.providerSharePercent * cost) / 100,
      options: options,
    });
    Logger.log(orderObject, "SharedOrderService.createOrder.orderObject");
    let order = await this.orderRepository.save(orderObject);
    if (input.couponCode != null && input.couponCode != "" && rider != null) {
      order = await this.commonCouponService.applyCoupon(
        input.couponCode,
        order.id,
        rider.id
      );
    }
    let activityType = RequestActivityType.RequestedByRider;
    if (input.intervalMinutes > 0) {
      activityType =
        input.operatorId == null
          ? (activityType = RequestActivityType.BookedByRider)
          : RequestActivityType.BookedByOperator;
    } else {
      activityType =
        input.operatorId == null
          ? (activityType = RequestActivityType.RequestedByRider)
          : RequestActivityType.RequestedByOperator;
    }
    this.activityRepository.insert({ requestId: order.id, type: activityType });
    this.riderService.repo.update(order.riderId!, {
      lastActivityAt: new Date(),
    });
    if (input.driverId != null) {
      this.assignOrderToDriver(order.id, input.driverId);
      return order;
    } else {
      await this.orderRedisService.add(
        { ...order, fleetIds: fleetIdsInPoint },
        input.intervalMinutes | 0
      );

      Logger.log(order.id, "SharedOrderService.createOrder.publishingOrder");
      Logger.log(
        driversWithService,
        "SharedOrderService.createOrder.driversWithService"
      );
      if ((input.intervalMinutes ?? 0) < 30 && !shouldPrePay) {
        this.orderRedisService.driverNotified(order.id, driversWithService);
        this.pubSub.publish("orderCreated", {
          orderCreated: order,
          driverIds: driversWithService.map((driver) => driver.id),
        });
        this.driverNotificationService.requests(driversWithService);
      }
    }

    return order;
  }

  async createOrderByQr(input: {
    riderId?: number;
    serviceId: number;
    intervalMinutes: number;
    points: Point[];
    addresses: string[];
    operatorId?: number;
    twoWay?: boolean;
    optionIds?: string[];
    couponCode?: string;
    fleetId?: number;
    paymentMode?: PaymentMode;
    paymentMethodId?: number;
    waitMinutes: number;
    driverId: number; // Обязательно передаём водителя
  }): Promise<TaxiOrderEntity> {
    Logger.log(input, "SharedOrderService.createOrderByQr: Входные данные");

    // Получаем зону цен, если точек ровно 2
    let zonePricings: ZonePriceEntity[] = [];
    if (input.points.length === 2) {
      Logger.log("Получение ценовой зоны для точек", "createOrderByQr");
      zonePricings = await this.getZonePricingsForPoints(
        input.points[0],
        input.points[1]
      );
      Logger.log(
        `Найдено ценовых зон: ${zonePricings.length}`,
        "createOrderByQr"
      );
    } else {
      Logger.log(
        "Ценовая зона не получена, т.к. количество точек != 2",
        "createOrderByQr"
      );
    }

    // Получаем сервис
    const service = await this.servicesService.getWithId(input.serviceId);
    if (!service) {
      Logger.error("Сервис не найден", "createOrderByQr");
      throw new ForbiddenError("SERVICE_NOT_FOUND");
    }
    Logger.log(`Сервис найден: ID=${service.id}`, "createOrderByQr");

    // --- УДАЛЕНО --- Поиск близких водителей и фильтрация по сервису и флиту
    // const closeDrivers = ...
    // const driverIds = ...
    // const fleetIdsInPoint = ...
    // const driversWithService = ...

    // Получаем опции и считаем доплату за платные опции
    let optionFee = 0;
    let options: ServiceOptionEntity[] = [];
    if (input.optionIds != null) {
      options = await this.serviceOptionRepository.findByIds(input.optionIds);
      Logger.log(`Опций найдено: ${options.length}`, "createOrderByQr");
      if ((input.twoWay ?? false) && input.points.length > 1) {
        input.points.push(input.points[0]);
        input.addresses.push(input.addresses[0]);
        Logger.log(
          "Включена опция 'двухсторонний' — добавлена обратная точка и адрес",
          "createOrderByQr"
        );
      }
      const paidOptions = options.filter(
        (opt) => opt.type === ServiceOptionType.Paid
      );
      optionFee = paidOptions.reduce(
        (sum, opt) => sum + (opt.additionalFee ?? 0),
        0
      );
      Logger.log(`Общая доплата за опции: ${optionFee}`, "createOrderByQr");
    } else {
      Logger.log("Опции не выбраны", "createOrderByQr");
    }

    // Расчет метрик маршрута
    const metrics =
      service.perHundredMeters > 0
        ? await this.googleServices.getSumDistanceAndDuration(input.points)
        : { distance: 0, duration: 0, directions: [] };
    Logger.log(
      `Метрики маршрута: расстояние=${metrics.distance}, длительность=${metrics.duration}`,
      "createOrderByQr"
    );

    // Рассчитываем ETA (время начала поездки)
    const eta = new Date(
      new Date().getTime() + (input.intervalMinutes | 0) * 60 * 1000
    );
    Logger.log(`Расчет ETA: ${eta.toISOString()}`, "createOrderByQr");

    // Получаем райдера
    const rider =
      input.riderId == null
        ? null
        : await this.riderService.repo.findOneBy({ id: input.riderId });
    Logger.log(`Райдер найден: ${rider ? rider.id : "нет"}`, "createOrderByQr");
    const isResident = rider?.isResident ?? process.env.MOTAXI == null;
    Logger.log(`Флаг резидента райдера: ${isResident}`, "createOrderByQr");

    // Получаем флит для точки
    const fleetIdsInPoint = await this.sharedFleetService.getFleetIdsInPoint(
      input.points[0]
    );
    Logger.log(`Флиты в точке: ${fleetIdsInPoint}`, "createOrderByQr");
    const feeMultiplier =
      fleetIdsInPoint.length === 0
        ? 1
        : ((await this.sharedFleetService.getFleetById(fleetIdsInPoint[0]))
            ?.feeMultiplier ?? 1);
    Logger.log(`Множитель комиссии флита: ${feeMultiplier}`, "createOrderByQr");

    // Рассчитываем итоговую стоимость
    let cost =
      this.servicesService.calculateCost(
        service,
        metrics.distance,
        metrics.duration,
        eta,
        feeMultiplier,
        isResident
      ) +
      optionFee +
      service.perMinuteWait * (input.waitMinutes ?? 0);
    Logger.log(`Стоимость после расчёта: ${cost}`, "createOrderByQr");

    // Применяем зональную цену, если есть
    const zonePricing = zonePricings.filter((price) =>
      price.services.some((s) => s.id === input.serviceId)
    );
    if (zonePricing.length > 0) {
      cost = zonePricing[0].cost;
      Logger.log(
        `Стоимость переопределена зональной ценой: ${cost}`,
        "createOrderByQr"
      );
      const now = new Date();
      for (const multiplier of zonePricings[0].timeMultipliers) {
        const startMinutes =
          parseInt(multiplier.startTime.split(":")[0]) * 60 +
          parseInt(multiplier.startTime.split(":")[1]);
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        const endMinutes =
          parseInt(multiplier.endTime.split(":")[0]) * 60 +
          parseInt(multiplier.endTime.split(":")[1]);
        if (nowMinutes >= startMinutes && nowMinutes <= endMinutes) {
          cost *= multiplier.multiply;
          Logger.log(
            `Применён временной множитель ${multiplier.multiply}, новая стоимость: ${cost}`,
            "createOrderByQr"
          );
        }
      }
    }

    // Получаем регион
    const regions = await this.regionService.getRegionWithPoint(
      input.points[0]
    );
    Logger.log(`Регион найден: ${regions.length}`, "createOrderByQr");

    // Проверка максимального расстояния
    if (
      service.maximumDestinationDistance !== 0 &&
      metrics.distance > service.maximumDestinationDistance
    ) {
      Logger.error(
        "Расстояние до точки назначения превышает максимум",
        "createOrderByQr"
      );
      throw new ForbiddenError("DISTANCE_TOO_FAR");
    }

    // Проверка необходимости предоплаты
    let shouldPrePay = false;
    const paidAmount = 0;
    if (service.prepayPercent > 0 && input.riderId != null) {
      const balance =
        await this.sharedRiderWalletService.getRiderCreditInCurrency(
          input.riderId,
          regions[0].currency
        );
      const amountNeedsToBePrePaid = (cost * service.prepayPercent) / 100;
      if (balance < amountNeedsToBePrePaid) {
        shouldPrePay = true;
        Logger.log(
          `Требуется предоплата: ${amountNeedsToBePrePaid}`,
          "createOrderByQr"
        );
      } else {
        Logger.log("Предоплата не требуется", "createOrderByQr");
      }
    }

    Logger.log(`Флаг предоплаты: ${shouldPrePay}`, "createOrderByQr");
    Logger.log(`Итоговая стоимость: ${cost}`, "createOrderByQr");
    Logger.log(`Оплата уже внесена: ${paidAmount}`, "createOrderByQr");
    Logger.log(`Стоимость опций: ${optionFee}`, "createOrderByQr");
    Logger.log(`ETA: ${eta.toISOString()}`, "createOrderByQr");

    // Создаём объект заказа
    const orderObject: TaxiOrderEntity = this.orderRepository.create({
      serviceId: input.serviceId,
      currency: regions[0].currency,
      riderId: input.riderId,
      points: input.points,
      addresses: input.addresses.map((address) => address.replace(", ", "-")),
      distanceBest: metrics.distance,
      durationBest: metrics.duration,
      directions: metrics.directions,
      paymentMode: input.paymentMode,
      driverId: input.driverId,
      savedPaymentMethodId:
        input.paymentMode === PaymentMode.SavedPaymentMethod
          ? input.paymentMethodId!
          : undefined,
      paymentGatewayId:
        input.paymentMode === PaymentMode.PaymentGateway
          ? input.paymentMethodId!
          : undefined,
      status: shouldPrePay ? OrderStatus.WaitingForPrePay : OrderStatus.Started,
      paidAmount,
      costBest: cost,
      costAfterCoupon: cost,
      expectedTimestamp: eta,
      operatorId: input.operatorId,
      waitMinutes: input.waitMinutes ?? 0,
      waitCost: service.perMinuteWait * (input.waitMinutes ?? 0),
      rideOptionsCost: optionFee,
      fleetId: input.fleetId,
      providerShare:
        service.providerShareFlat + (service.providerSharePercent * cost) / 100,
      options,
    });
    Logger.log(
      orderObject,
      "SharedOrderService.createOrderByQr: объект заказа создан"
    );

    // Сохраняем заказ
    let order = await this.orderRepository.save(orderObject);
    Logger.log(`Заказ сохранён с ID: ${order.id}`, "createOrderByQr");

    // Применяем купон, если есть
    if (input.couponCode && rider) {
      Logger.log(`Применение купона: ${input.couponCode}`, "createOrderByQr");
      order = await this.commonCouponService.applyCoupon(
        input.couponCode,
        order.id,
        rider.id
      );
      Logger.log(
        `Купон применён, новая стоимость заказа: ${order.costAfterCoupon}`,
        "createOrderByQr"
      );
    }

    // Лог активности — сразу StartedByQr
    await this.activityRepository.insert({
      requestId: order.id,
      type: RequestActivityType.StartedByQr,
    });
    Logger.log(
      `Активность 'StartedByQr' записана для заказа ${order.id}`,
      "createOrderByQr"
    );

    // Обновляем время активности райдера
    await this.riderService.repo.update(order.riderId!, {
      lastActivityAt: new Date(),
    });
    Logger.log(
      `Время последней активности райдера обновлено для ID: ${order.riderId}`,
      "createOrderByQr"
    );

    // Назначаем водителя — он уже известен
    this.assignOrderToDriver(order.id, input.driverId);
    Logger.log(
      `Водитель с ID ${input.driverId} назначен на заказ ${order.id}`,
      "createOrderByQr"
    );

    return order;
  }

  async processPrePay(orderId: number, authorizedAmount = 0) {
    const order: TaxiOrderEntity = await this.orderRepository.findOneOrFail({
      where: { id: orderId },
      relations: ["service", "driver", "driver.fleet", "rider"],
    });
    const riderCredit =
      await this.sharedRiderWalletService.getRiderCreditInCurrency(
        order.riderId,
        order.currency
      );
    const minimumRequired =
      order.costAfterCoupon * (order.service.prepayPercent / 100.0);
    Logger.log(`riderCredit: ${riderCredit}`, "processPrePay");
    Logger.log(`authorizedAmount: ${authorizedAmount}`, "processPrePay");
    Logger.log(`serviceFee: ${order.costAfterCoupon}`, "processPrePay");
    Logger.log(
      `Minmum required authorizedAmount: ${minimumRequired}`,
      "processPrePay"
    );
    if (riderCredit + authorizedAmount - minimumRequired < 1) {
      throw new ForbiddenError("Credit is not enough");
    }
    await this.orderRepository.update(order.id, {
      status: OrderStatus.Requested,
    });
    const closeDriverIds = (
      await this.driverRedisService.getClose(
        order.points[0],
        order.service.searchRadius
      )
    ).map((x: DriverLocationWithId) => x.driverId);
    const fleetIdsInPoint = await this.sharedFleetService.getFleetIdsInPoint(
      order.points[0]
    );
    const driversWithService =
      await this.driverService.getOnlineDriversWithServiceId(
        closeDriverIds,
        order.serviceId,
        fleetIdsInPoint
      );
    this.orderRedisService.driverNotified(order.id, driversWithService);
    this.pubSub.publish("orderCreated", {
      orderCreated: order,
      driverIds: driversWithService.map((driver) => driver.id),
    });
    this.driverNotificationService.requests(driversWithService);
    return this.orderRepository.findOneOrFail({
      where: { id: orderId },
      relations: ["service", "driver", "driver.fleet", "rider"],
    });
  }

  async finish(orderId: number, cashAmount = 0.0) {
    const order: TaxiOrderEntity = await this.orderRepository.findOneOrFail({
      where: { id: orderId },
      relations: ["service", "driver", "driver.fleet", "rider"],
    });
    if (
      order.service.paymentMethod == ServicePaymentMethod.OnlyCredit &&
      cashAmount > 0
    ) {
      throw new ForbiddenError(
        "Cash payment is not available for this service."
      );
    }
    let riderCredit =
      await this.sharedRiderWalletService.getRiderCreditInCurrency(
        order.riderId,
        order.currency
      );
    const providerPercent =
      order.rider.isResident === false
        ? order.service.providerSharePercent * order.service.touristMultiplier
        : order.service.providerSharePercent;
    const commission =
      (providerPercent * order.costAfterCoupon) / 100 +
      order.service.providerShareFlat;
    let unPaidAmount =
      order.costAfterCoupon - order.paidAmount + order.tipAmount;
    if (riderCredit + cashAmount < unPaidAmount) {
      const payment = await this.paymentRepository.find({
        where: {
          userType: "client",
          userId: order.riderId.toString(),
          status: PaymentStatus.Authorized,
          orderNumber: order.id.toString(),
        },
        order: { id: "DESC" },
      });
      const status = OrderStatus.WaitingForPostPay;
      if (payment.length > 0) {
        const captureResult = await firstValueFrom(
          this.httpService.get<{ status: "OK" | "FAILED" }>(
            `${process.env.GATEWAY_SERVER_URL}/capture?id=${
              payment[0].transactionNumber
            }&amount=${unPaidAmount - riderCredit}`
          )
        );
        if (captureResult.data.status == "OK") {
          riderCredit =
            await this.sharedRiderWalletService.getRiderCreditInCurrency(
              order.riderId,
              order.currency
            );
          unPaidAmount =
            order.costAfterCoupon - order.paidAmount + order.tipAmount;
          if (riderCredit + cashAmount < unPaidAmount) {
            await this.orderRepository.update(order.id, {
              status,
            });
            return;
          }
        } else {
          await this.orderRepository.update(order.id, {
            status,
          });
          return;
        }
      } else {
        await this.orderRepository.update(order.id, {
          status,
        });
        return;
      }
    }
    await this.driverService.rechargeWallet({
      status: TransactionStatus.Done,
      driverId: order.driverId!,
      currency: order.currency,
      action: TransactionAction.Deduct,
      deductType: DriverDeductTransactionType.Commission,
      amount: -1 * commission,
      requestId: order.id,
    });
    let fleetShare = 0;
    if (order.driver?.fleetId != null) {
      fleetShare =
        (commission * order.driver.fleet!.commissionSharePercent) / 100 +
        order.driver.fleet!.commissionShareFlat;
      if (fleetShare > 0) {
        this.sharedFleetService.rechargeWallet({
          fleetId: order.driver.fleetId,
          action: TransactionAction.Recharge,
          rechargeType: ProviderRechargeTransactionType.Commission,
          amount: fleetShare,
          currency: order.currency,
          requestId: order.id,
          driverId: order.driverId,
        });
      }
    }
    await this.sharedProviderService.rechargeWallet({
      action: TransactionAction.Recharge,
      rechargeType: ProviderRechargeTransactionType.Commission,
      currency: order.currency,
      amount: commission - fleetShare,
    });
    if (order.costAfterCoupon - cashAmount > 0) {
      await this.driverService.rechargeWallet({
        status: TransactionStatus.Done,
        driverId: order.driverId!,
        currency: order.currency,
        requestId: order.id,
        action: TransactionAction.Recharge,
        rechargeType: DriverRechargeTransactionType.OrderFee,
        amount: order.costAfterCoupon - cashAmount + order.tipAmount,
      });
    }
    if (riderCredit > 0 && cashAmount < unPaidAmount) {
      await this.sharedRiderWalletService.rechargeWallet({
        status: TransactionStatus.Done,
        action: TransactionAction.Deduct,
        deductType: RiderDeductTransactionType.OrderFee,
        currency: order.currency,
        requestId: order.id,
        amount: -1 * (unPaidAmount - cashAmount),
        riderId: order.riderId,
      });
    }
    await this.orderRepository.update(order.id, {
      paidAmount: order.costAfterCoupon,
      status: OrderStatus.WaitingForReview,
      finishTimestamp: new Date(),
    });
    await this.driverService.updateDriverStatus(
      order.driverId!,
      DriverStatus.Online
    );
    this.activityRepository.insert({
      requestId: order.id,
      type: RequestActivityType.Paid,
    });
  }

  async assignOrderToDriver(orderId: number, driverId: number) {
    const [travel, driverLocation] = await Promise.all([
      this.orderRepository.findOneOrFail({
        where: { id: orderId },
        relations: ["driver", "driver.car", "driver.carColor", "service"],
      }),
      this.driverRedisService.getDriverCoordinate(driverId),
    ]);
    this.activityRepository.insert({
      requestId: orderId,
      type: RequestActivityType.DriverAccepted,
    });
    //  const allowedStatuses = [OrderStatus.Found, OrderStatus.NoCloseFound, OrderStatus.Requested, OrderStatus.Booked];
    // if (travel == null || !allowedStatuses.includes(travel.status)) {
    if (travel == null) {
      throw new ForbiddenError("Already Taken");
    }
    if (travel.driverId != null) {
      this.driverNotificationService.canceled(travel.driver!);
      await this.driverService.updateDriverStatus(
        travel.driverId,
        DriverStatus.Online
      );
      travel.status = OrderStatus.RiderCanceled;
      this.pubSub.publish("orderUpdated", { orderUpdated: travel });
    }
    const metrics =
      driverLocation != null
        ? await this.googleServices.getSumDistanceAndDuration([
            travel.points[0],
            driverLocation,
          ])
        : { distance: 0, duration: 0 };
    const dt = new Date();
    const etaPickup = dt.setSeconds(dt.getSeconds() + metrics.duration);
    this.driverService.updateDriverStatus(driverId, DriverStatus.InService);
    await this.orderRedisService.expire([orderId]);
    await this.orderRepository.update(orderId, {
      status: OrderStatus.DriverAccepted,
      etaPickup: new Date(etaPickup),
      driverId,
    });
    const result = await this.orderRepository.findOneOrFail({
      where: { id: orderId },
      relations: [
        "driver",
        "driver.car",
        "driver.carColor",
        "service",
        "rider",
      ],
    });
    this.pubSub.publish("orderUpdated", { orderUpdated: result });
    this.pubSub.publish("orderRemoved", { orderRemoved: result }); // This one has a filter to let know all except the one accepted.
    this.riderNotificationService.bookingAssigned(
      result.rider,
      result.expectedTimestamp.toISOString()
    );
    this.driverNotificationService.assigned(
      result.driver!,
      result.expectedTimestamp.toTimeString(),
      result.addresses[0],
      result.addresses[result.addresses.length - 1]
    );
    return result;
  }
}

enum CalculateFareError {
  RegionUnsupported = "REGION_UNSUPPORTED",
  NoServiceInRegion = "NO_SERVICE_IN_REGION",
}
