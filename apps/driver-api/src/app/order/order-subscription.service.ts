import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { Injectable, Logger } from '@nestjs/common';
import { Subscription } from '@nestjs/graphql';
import { TaxiOrderEntity } from '@ridy/database';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { AvailableOrderDTO } from './dto/available-order.dto';
import { OrderDTO } from './dto/order.dto';

@Injectable()
export class OrderSubscriptionService {
  constructor(
    @InjectPubSub()
    public pubSub: RedisPubSub,
  ) {}

  @Subscription(() => OrderDTO, {
    filter: (
      payload: { orderCreated: AvailableOrderDTO; driverIds: string[] },
      variables,
      context,
    ) => {
      Logger.log(payload, 'OrderSubscriptionService.orderCreated.payload');
      Logger.log(context, 'OrderSubscriptionService.orderCreated.context');
      return payload.driverIds.includes(context.req.extra.user.id);
    },
  })
  orderCreated() {
    return this.pubSub.asyncIterator('orderCreated');
  }

  @Subscription(() => OrderDTO, {
    filter: (
      payload: { orderUpdated: TaxiOrderEntity },
      variables,
      context,
    ) => {
      return context.req.extra.user.id == payload.orderUpdated.driverId;
    },
    resolve: (payload: { orderUpdated: TaxiOrderEntity }) => {
      payload.orderUpdated.riderLastSeenMessagesAt = new Date(
        payload.orderUpdated.riderLastSeenMessagesAt,
      );
      payload.orderUpdated.createdOn = new Date(payload.orderUpdated.createdOn);
      if (payload.orderUpdated.startTimestamp != null) {
        payload.orderUpdated.startTimestamp = new Date(
          payload.orderUpdated.startTimestamp,
        );
      }
      payload.orderUpdated.expectedTimestamp = new Date(
        payload.orderUpdated.expectedTimestamp,
      );
      if (payload.orderUpdated.finishTimestamp != null) {
        payload.orderUpdated.finishTimestamp = new Date(
          payload.orderUpdated.finishTimestamp,
        );
      }
      if (payload.orderUpdated.etaPickup != null) {
        payload.orderUpdated.etaPickup = new Date(
          payload.orderUpdated.etaPickup,
        );
      }
      payload.orderUpdated.driverLastSeenMessagesAt = new Date(
        payload.orderUpdated.driverLastSeenMessagesAt,
      );
      payload.orderUpdated.expectedTimestamp = new Date(
        payload.orderUpdated.expectedTimestamp,
      );
      Logger.log(JSON.stringify(payload), `orderUpdated.payload`);
      return payload.orderUpdated;
    },
  })
  orderUpdated() {
    return this.pubSub.asyncIterator('orderUpdated');
  }

  @Subscription(() => OrderDTO, {
    filter: (
      payload: { orderRemoved: TaxiOrderEntity },
      variables,
      context,
    ) => {
      if (payload.orderRemoved.driverId == null) return true;
      return context.req.extra.user.id != payload.orderRemoved.driverId;
    },
  })
  orderRemoved() {
    return this.pubSub.asyncIterator('orderRemoved');
  }
}
