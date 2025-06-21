import { QueryService } from '@ptc-org/nestjs-query-core';
import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Inject } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverStatus } from '@ridy/database';
import { OrderStatus } from '@ridy/database';
import { RequestActivityType } from '@ridy/database';
import { RequestActivityEntity } from '@ridy/database';
import { TaxiOrderEntity } from '@ridy/database';
import { RiderNotificationService } from '@ridy/database';
import { GoogleServicesService } from '@ridy/database';
import { SharedDriverService } from '@ridy/database';
import { SharedOrderService } from '@ridy/database';
import { DriverRedisService } from '@ridy/database';
import { OrderRedisService } from '@ridy/database';
import { ForbiddenError } from '@nestjs/apollo';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Repository } from 'typeorm';

import { UserContext } from '../auth/authenticated-user';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderService } from './order.service';

@QueryService(TaxiOrderEntity)
export class DriverOrderQueryService extends TypeOrmQueryService<TaxiOrderEntity> {
  constructor(
    @InjectRepository(TaxiOrderEntity)
    public orderRepository: Repository<TaxiOrderEntity>,
    @InjectRepository(RequestActivityEntity)
    private activityRepository: Repository<RequestActivityEntity>,
    private driverService: SharedDriverService,
    private orderService: OrderService,
    private orderRedisService: OrderRedisService,
    private driverRedisService: DriverRedisService,
    private googleServices: GoogleServicesService,
    private sharedOrderService: SharedOrderService,
    @InjectPubSub()
    private pubSub: RedisPubSub,
    @Inject(CONTEXT) private context: UserContext,
    private riderNotificationService: RiderNotificationService,
  ) {
    super(orderRepository);
  }

  override async updateOne(
    id: number,
    update: UpdateOrderInput,
  ): Promise<TaxiOrderEntity> {
    let order = await this.orderRepository.findOneOrFail({
      where: { id },
      relations: [
        'rider',
        'service',
        'options',
        'conversation',
        'driver',
        'savedPaymentMethod',
        'paymentGateway',
        'driver.car',
        'driver.carColor',
      ],
    });
    let publishChanges = true;
    switch (update.status) {
      case OrderStatus.DriverCanceled:
        await this.activityRepository.insert({
          requestId: id,
          type: RequestActivityType.CanceledByDriver,
        });
        await this.orderService.cancelOrder(id);
        this.riderNotificationService.canceled(order!.rider);
        break;

      case OrderStatus.DriverAccepted: {
        const [travel, driverLocation] = await Promise.all([
          this.orderRepository.findOneByOrFail({ id }),
          this.driverRedisService.getDriverCoordinate(this.context.req.user.id),
        ]);
        this.activityRepository.insert({
          requestId: travel!.id,
          type: RequestActivityType.DriverAccepted,
        });
        const allowedStatuses = [
          OrderStatus.Found,
          OrderStatus.NotFound,
          OrderStatus.NoCloseFound,
          OrderStatus.Requested,
          OrderStatus.Booked,
        ];
        if (travel == null || !allowedStatuses.includes(travel.status)) {
          throw new ForbiddenError('Already Taken');
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
        this.driverService.updateDriverStatus(
          this.context.req.user.id,
          DriverStatus.InService,
        );
        await this.orderRedisService.expire([id]);
        await super.updateOne(id, {
          status: OrderStatus.DriverAccepted,
          etaPickup: new Date(etaPickup),
          driverId: this.context.req.user.id,
        });
        order = await this.orderRepository.findOneOrFail({
          where: { id },
          relations: [
            'rider',
            'service',
            'options',
            'conversation',
            'driver',
            'savedPaymentMethod',
            'paymentGateway',
            'driver.car',
            'driver.carColor',
          ],
        });
        this.riderNotificationService.accepted(order!.rider);

        this.pubSub.publish('orderUpdated', { orderUpdated: order });
        this.pubSub.publish('orderRemoved', { orderRemoved: order }); // This one has a filter to let know all except the one accepted.
        publishChanges = false;
        break;
      }

      case OrderStatus.Arrived:
      case OrderStatus.Started:
        await super.updateOne(id, { status: update.status });
        this.activityRepository.insert({
          requestId: id,
          type:
            update.status == OrderStatus.Arrived
              ? RequestActivityType.ArrivedToPickupPoint
              : RequestActivityType.Started,
        });
        //result.driver = await this.driverService.driverRepo.findOne(this.context.req.user.id, {relations: ['car', 'carColor']});
        if (update.status == OrderStatus.Arrived) {
          this.riderNotificationService.arrived(order.rider);
        } else {
          this.riderNotificationService.started(order.rider);
        }
        break;

      case OrderStatus.Finished:
        await this.sharedOrderService.finish(id, update.paidAmount);
        this.activityRepository.insert({
          requestId: id,
          type: RequestActivityType.ArrivedToDestination,
        });
        order = await this.orderRepository.findOneOrFail({
          where: { id },
          relations: {
            rider: true,
            service: true,
            options: true,
            conversation: true,
            driver: {
              car: true,
              carColor: true,
            },
            savedPaymentMethod: true,
            paymentGateway: true,
          },
        });
        if (
          order.paidAmount + (update.paidAmount ?? 0) <
          order.costAfterCoupon
        ) {
          this.riderNotificationService.waitingForPostPay(order.rider);
        } else {
          this.riderNotificationService.finished(order.rider);
        }
        break;

      default:
        if (update.status != null) {
          throw new ForbiddenError('Update status to this is not possible');
        } else {
          await super.updateOne(id, update);
        }
    }
    if (update.destinationArrivedTo != null) {
      this.repo.update(id, {
        destinationArrivedTo:
          update.destinationArrivedTo > order.addresses.length
            ? order.addresses.length
            : update.destinationArrivedTo,
      });
    }
    if (publishChanges) {
      order = await this.orderRepository.findOneOrFail({
        where: { id },
        relations: [
          'rider',
          'service',
          'options',
          'conversation',
          'driver',
          'savedPaymentMethod',
          'paymentGateway',
          'driver.car',
          'driver.carColor',
        ],
      });

      this.pubSub.publish('orderUpdated', { orderUpdated: order });
    }
    return order;
  }
}
