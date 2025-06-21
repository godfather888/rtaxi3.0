import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { Injectable, Logger } from '@nestjs/common';
import { Args, ID, Subscription } from '@nestjs/graphql';
import { TaxiOrderEntity } from '@ridy/database';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { OrderDTO } from './dto/order.dto';
import { DriverLocationUpdateDTO } from './dto/driver-location-update.dto';

@Injectable()
export class OrderSubscriptionService {
  constructor(
    @InjectPubSub()
    private pubSub: RedisPubSub,
  ) {}

  @Subscription(() => OrderDTO, {
    filter: (
      payload: { orderUpdated: TaxiOrderEntity },
      variables,
      context,
    ) => {
      Logger.log(payload.orderUpdated, `orderUpdated payload`);
      Logger.log(
        `validating order update on rider side: ${
          payload.orderUpdated.riderId == context.req.extra.user.id
        }`,
      );
      return context.req.extra.user.id == payload.orderUpdated.riderId;
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
      Logger.log(JSON.stringify(payload), `orderUpdated payload`);
      return payload.orderUpdated;
    },
  })
  orderUpdated() {
    return this.pubSub.asyncIterator('orderUpdated');
  }

  @Subscription(() => DriverLocationUpdateDTO, {
    filter: (
      payload: {
        driverLocationUpdated: DriverLocationUpdateDTO;
        riderId: string;
      },
      variables,
      context,
    ) => {
      return context.req.extra.user.id == payload.riderId;
    },
    resolve: (payload: {
      driverLocationUpdated: DriverLocationUpdateDTO;
      riderId: string;
    }) => {
      return payload.driverLocationUpdated;
    },
  })
  driverLocationUpdated(
    @Args('driverId', {
      type: () => ID,
      nullable: true,
      description:
        "This is deprecated, just here so older versions won't break",
    })
    _driverId?: string, // Deprecated but here for now so older versions client won't break
  ) {
    return this.pubSub.asyncIterator('driverLocationUpdated');
  }
}
