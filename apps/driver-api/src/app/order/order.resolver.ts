import { CRUDResolver, InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { DriverRedisService } from '@ridy/database';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { UserContext } from '../auth/authenticated-user';
import { GqlAuthGuard } from '../auth/jwt-gql-auth.guard';
import { DriverOrderQueryService } from './driver-order.query-service';
import { AvailableOrderDTO } from './dto/available-order.dto';
import { OrderDTO } from './dto/order.dto';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderService } from './order.service';
import { SharedDriverService } from '@ridy/database';
import { DriverStatus } from '@ridy/database';
import { OrderStatus } from '@ridy/database';
import { In } from 'typeorm';
import { RiderReviewInput } from './dto/rider-review.input';

@Resolver(() => OrderDTO)
@UseGuards(GqlAuthGuard)
export class OrderResolver extends CRUDResolver(OrderDTO, {
  UpdateDTOClass: UpdateOrderInput,
  create: { disabled: true },
  update: { many: { disabled: true } },
  delete: { disabled: true },
  enableAggregate: true,
}) {
  constructor(
    public readonly driverOrderService: DriverOrderQueryService,
    @Inject(CONTEXT) private context: UserContext,
    private orderService: OrderService,
    private driverService: SharedDriverService,
    private driverRedisService: DriverRedisService,
    @InjectPubSub()
    private redisPubSub: RedisPubSub,
  ) {
    super(driverOrderService as any);
  }

  // @Query(() => OrderDTO)
  // async currentOrder(): Promise<OrderDTO> {
  //   return this.orderRepository.findOne({ driverId: this.context.req.user.id, status: In([OrderStatus.DriverAccepted, OrderStatus.Arrived, OrderStatus.Started, OrderStatus.WaitingForPostPay]) });
  // }

  @Query(() => [OrderDTO])
  async availableOrders(): Promise<OrderDTO[]> {
    return this.orderService.getOrdersForDriverWithId(this.context.req.user.id);
  }

  @Mutation(() => [OrderDTO])
  async updateDriversLocationNew(
    @Args('point', { type: () => Point }) point: Point,
  ): Promise<AvailableOrderDTO[]> {
    await this.driverRedisService.setLocation(this.context.req.user.id, point);
    const driver = await this.driverService.findById(this.context.req.user.id);
    if (driver.status == DriverStatus.InService) {
      const driverCurrentOrder =
        await this.orderService.orderRepository.findOne({
          where: {
            driverId: this.context.req.user.id,
            status: In([
              OrderStatus.DriverAccepted,
              OrderStatus.Arrived,
              OrderStatus.Started,
              OrderStatus.WaitingForPostPay,
            ]),
          },
          order: { id: 'DESC' },
        });
      Logger.log(JSON.stringify(driverCurrentOrder), 'driverCurrentOrder');
      Logger.log(JSON.stringify(point), 'point');
      await this.redisPubSub.publish('driverLocationUpdated', {
        driverLocationUpdated: {
          driverId: this.context.req.user.id,
          point,
          orderId: driverCurrentOrder.id,
        },
        riderId: driverCurrentOrder.riderId,
      });
      return [];
    } else if (
      driver.status == DriverStatus.Online ||
      driver.status == DriverStatus.Offline
    ) {
      return this.orderService.getOrdersForDriverEntity(driver);
    } else {
      return [];
    }
  }

  @Mutation(() => OrderDTO)
  async submitReview(
    @Args('input', { type: () => RiderReviewInput }) input: RiderReviewInput,
  ): Promise<OrderDTO> {
    return this.orderService.submitReview({
      ...input,
      driverId: this.context.req.user.id,
    });
  }
}
