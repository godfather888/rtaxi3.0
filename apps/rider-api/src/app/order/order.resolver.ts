import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommonCouponService } from '@ridy/database';
import { Point } from '@ridy/database';
import { TaxiOrderEntity } from '@ridy/database';
import { SharedOrderService } from '@ridy/database';
import { DriverRedisService } from '@ridy/database';
import { UserContextOptional } from '../auth/authenticated-user';
import { GqlAuthGuard } from '../auth/access-token.guard';
import { CalculateFareDTO } from './dto/calculate-fare.dto';
import { CalculateFareInput } from './dto/calculate-fare.input';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderDTO } from './dto/order.dto';
import { SubmitFeedbackInput } from './dto/submit-feedback.input';
import { RiderOrderService } from './rider-order.service';
import { CurrentOrder } from './dto/current-order.dto';

@Resolver(() => OrderDTO)
export class OrderResolver {
  constructor(
    @Inject(CONTEXT) private context: UserContextOptional,
    private orderService: SharedOrderService,
    private riderOrderService: RiderOrderService,
    private driverRedisService: DriverRedisService,
    private commonCouponService: CommonCouponService,
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
      'driver',
      'driver.carColor',
      'driver.car',
      'conversation',
    ]);
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
    @Args('input', { type: () => CalculateFareInput })
    input: CalculateFareInput,
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
    @Args('input', { type: () => CreateOrderInput }) input: CreateOrderInput,
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
    @Args('orderId', { type: () => ID, nullable: true }) orderId?: number,
    @Args('cancelReasonId', { type: () => ID, nullable: true })
    cancelReasonId?: number,
    @Args('cancelReasonNote', { type: () => String, nullable: true })
    cancelReasonNote?: string,
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
    @Args('id', { type: () => ID }) id: number,
    @Args('cancelReasonId', { type: () => ID!, nullable: true })
    cancelReasonId?: number,
    @Args('cancelReasonNote', { type: () => String, nullable: true })
    cancelReasonNote?: string,
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
      this.context.req.user.id,
    );
    if (order?.driverId != null) {
      Logger.log(`driver id: ${order.driverId}`);
      const coordinate = await this.driverRedisService.getDriverCoordinate(
        order.driverId,
      );
      Logger.log(JSON.stringify(coordinate));
      return coordinate;
    } else {
      return null;
    }
  }

  @Query(() => [Point], {})
  async getDriversLocation(
    @Args('center', { type: () => Point, nullable: true }) center?: Point,
  ): Promise<Point[]> {
    if (center == null) return [];
    const closeDrivers = await this.driverRedisService.getClose(center, 1000);
    return closeDrivers.map((item) => item.location);
  }

  @Mutation(() => OrderDTO)
  @UseGuards(GqlAuthGuard)
  async submitReview(
    @Args('review', { type: () => SubmitFeedbackInput })
    review: SubmitFeedbackInput,
  ): Promise<TaxiOrderEntity> {
    return this.riderOrderService.submitReview(
      this.context.req.user.id,
      review,
    );
  }

  @Mutation(() => OrderDTO)
  @UseGuards(GqlAuthGuard)
  async skipReview(): Promise<TaxiOrderEntity> {
    return this.riderOrderService.skipReview(this.context.req.user.id);
  }
}
