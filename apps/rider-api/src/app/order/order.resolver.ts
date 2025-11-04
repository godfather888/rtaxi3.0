import { Inject, Logger, UseGuards } from "@nestjs/common";
import { Args, CONTEXT, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CommonCouponService } from "@ridy/database";
import { Point } from "@ridy/database";
import { TaxiOrderEntity } from "@ridy/database";
import { SharedOrderService } from "@ridy/database";
import { DriverRedisService } from "@ridy/database";
import { DriverEntity, DriverStatus } from "@ridy/database";
import { UserContextOptional } from "../auth/authenticated-user";
import { GqlAuthGuard } from "../auth/access-token.guard";
import { CalculateFareDTO } from "./dto/calculate-fare.dto";
import { CalculateFareInput } from "./dto/calculate-fare.input";
import { CreateOrderInput } from "./dto/create-order.input";
import { OrderDTO } from "./dto/order.dto";
import { SubmitFeedbackInput } from "./dto/submit-feedback.input";
import { RiderOrderService } from "./rider-order.service";
import { CurrentOrder } from "./dto/current-order.dto";
import { StartRideByQrInput } from "./dto/start-ride-by-qr.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";

@Resolver(() => OrderDTO)
export class OrderResolver {
  constructor(
    @Inject(CONTEXT) private context: UserContextOptional,
    private orderService: SharedOrderService,
    private riderOrderService: RiderOrderService,
    private driverRedisService: DriverRedisService,
    private commonCouponService: CommonCouponService,
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>
  ) {}

  @Query(() => [CurrentOrder])
  @UseGuards(GqlAuthGuard)
  async activeOrders(): Promise<CurrentOrder[]> {
    return this.riderOrderService.getActiveOrders(this.context.req.user.id);
  }

  @Query(() => OrderDTO, {
    nullable: true,
  })
  @UseGuards(GqlAuthGuard)
  async currentOrder(): Promise<OrderDTO> {
    return this.riderOrderService.getCurrentOrder(this.context.req.user.id, [
      "driver",
      "driver.carColor",
      "driver.car",
      "conversation",
    ]);
  }

  @Mutation(() => OrderDTO)
  @UseGuards(GqlAuthGuard)
  async startRideByQr(
    @Args("input", { type: () => StartRideByQrInput }) input: StartRideByQrInput
  ): Promise<OrderDTO> {
    const driverId = await this.driverRedisService.getDriverIdByToken(
      input.token
    );

    console.log("driverID :", driverId);
    if (!driverId) {
      throw new Error("Invalid or expired QR token");
    }

    return this.orderService.createOrderByQr({
      riderId: this.context.req.user.id,
      driverId,
      serviceId: input.serviceId,
      intervalMinutes: 0,
      points: input.points,
      addresses: input.addresses,
      waitMinutes: input.waitTime ?? 0,
      twoWay: input.twoWay,
      optionIds: input.optionIds,
    });
  }

  // @Mutation(() => CalculateFareDTO)
  // @UseGuards(GqlAuthGuard)
  // async calculateFare(
  //   @Args('input', { type: () => CalculateFareInput })
  //   input: CalculateFareInput,
  // ): Promise<CalculateFareDTO> {
  //   Logger.log(
  //     `Creating order for userId:${this.context.req.user
  //       ?.id} with input ${JSON.stringify(input)}`,
  //     'OrderResolver.calculateFareMutation',
  //   );
  //   const coupon = await this.commonCouponService.checkCoupon(
  //     input.couponCode,
  //     this.context.req.user?.id,
  //   );
  //   return this.orderService.calculateFare({
  //     points: input.points,
  //     coupon: coupon,
  //     riderId: this.context.req.user?.id,
  //     twoWay: input.twoWay,
  //     waitTime: input.waitTime,
  //     selectedOptionIds: input.selectedOptionIds,
  //     orderType: input.orderType,
  //   });
  // }

  @Query(() => CalculateFareDTO)
  @UseGuards(GqlAuthGuard)
  async getFares(
    @Args("input", { type: () => CalculateFareInput })
    input: CalculateFareInput
  ): Promise<CalculateFareDTO> {
    let coupon;
    if (
      input.couponCode != null &&
      this.context.req.user?.id != null &&
      input.couponCode.length > 0
    ) {
      coupon = await this.commonCouponService.checkCoupon(input.couponCode);
    }
    return this.orderService.calculateFare({
      points: input.points,
      coupon: coupon,
      riderId: this.context.req.user?.id,
      twoWay: input.twoWay,
      waitTime: input.waitTime,
      selectedOptionIds: input.selectedOptionIds,
      orderType: input.orderType,
    });
  }

  @Mutation(() => OrderDTO)
  @UseGuards(GqlAuthGuard)
  async createOrder(
    @Args("input", { type: () => CreateOrderInput }) input: CreateOrderInput
  ): Promise<OrderDTO> {
    return this.orderService.createOrder({
      ...input,
      riderId: this.context.req.user.id,
      optionIds: input.optionIds,
      waitMinutes: input.waitTime,
      twoWay: input.twoWay,
    });
  }

  @Mutation(() => OrderDTO)
  @UseGuards(GqlAuthGuard)
  async cancelOrder(
    @Args("orderId", { type: () => ID, nullable: true }) orderId?: number,
    @Args("cancelReasonId", { type: () => ID, nullable: true })
    cancelReasonId?: number,
    @Args("cancelReasonNote", { type: () => String, nullable: true })
    cancelReasonNote?: string
  ): Promise<OrderDTO> {
    if (orderId != null) {
      return this.riderOrderService.cancelOrder({
        orderId: orderId,
        reasonId: cancelReasonId,
        reason: cancelReasonNote,
      });
    } else {
      return this.riderOrderService.cancelRiderLastOrder({
        riderId: this.context.req.user.id,
        reasonId: cancelReasonId,
        reason: cancelReasonNote,
      });
    }
  }

  @Mutation(() => OrderDTO)
  @UseGuards(GqlAuthGuard)
  async cancelBooking(
    @Args("id", { type: () => ID }) id: number,
    @Args("cancelReasonId", { type: () => ID!, nullable: true })
    cancelReasonId?: number,
    @Args("cancelReasonNote", { type: () => String, nullable: true })
    cancelReasonNote?: string
  ): Promise<OrderDTO> {
    return this.riderOrderService.cancelOrder({
      orderId: id,
      reasonId: cancelReasonId,
      reason: cancelReasonNote,
    });
  }

  @Query(() => Point, {
    nullable: true,
  })
  @UseGuards(GqlAuthGuard)
  async getCurrentOrderDriverLocation(): Promise<Point> {
    const order = await this.riderOrderService.getCurrentOrder(
      this.context.req.user.id
    );
    if (order?.driverId != null) {
      Logger.log(`driver id: ${order.driverId}`);
      const coordinate = await this.driverRedisService.getDriverCoordinate(
        order.driverId
      );
      Logger.log(JSON.stringify(coordinate));
      return coordinate;
    } else {
      return null;
    }
  }

  @Query(() => [Point], {})
  async getDriversLocation(
    @Args("center", { type: () => Point, nullable: true }) center?: Point
  ): Promise<Point[]> {
    if (center == null) return [];
    const closeDrivers = await this.driverRedisService.getClose(center, 1000);
    
    // Фильтруем только Online водителей
    if (closeDrivers.length === 0) return [];
    
    const driverIds = closeDrivers.map(d => d.driverId);
    const onlineDrivers = await this.driverRepository.find({
      where: {
        id: In(driverIds),
        status: DriverStatus.Online
      },
      select: ['id']
    });
    
    const onlineDriverIds = new Set(onlineDrivers.map(d => d.id));
    return closeDrivers
      .filter(item => onlineDriverIds.has(item.driverId))
      .map(item => item.location);
  }

  @Query(() => [Point], { description: 'Get locations of parked drivers near a point' })
  async parkedDriversLocation(
    @Args("center", { type: () => Point, nullable: false }) center: Point,
    @Args({ name: 'radius', type: () => Number, nullable: true }) radius?: number
  ): Promise<Point[]> {
    const closeDrivers = await this.driverRedisService.getClose(center, radius ?? 1000);
    if (closeDrivers.length === 0) return [];
    // Получаем статусы водителей из БД
    const driverIds = closeDrivers.map(d => d.driverId);
    const drivers = await this.orderService["driverRepository"].findByIds(driverIds);
    const parkedIds = drivers.filter(d => d.status === 'parked').map(d => d.id);
    return closeDrivers.filter(d => parkedIds.includes(d.driverId)).map(d => d.location);
  }

  @Mutation(() => OrderDTO)
  @UseGuards(GqlAuthGuard)
  async submitReview(
    @Args("review", { type: () => SubmitFeedbackInput })
    review: SubmitFeedbackInput
  ): Promise<TaxiOrderEntity> {
    return this.riderOrderService.submitReview(
      this.context.req.user.id,
      review
    );
  }

  @Mutation(() => OrderDTO)
  @UseGuards(GqlAuthGuard)
  async skipReview(): Promise<TaxiOrderEntity> {
    return this.riderOrderService.skipReview(this.context.req.user.id);
  }
}
