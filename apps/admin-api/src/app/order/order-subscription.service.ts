import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { Injectable } from '@nestjs/common';
import { Args, ID, Subscription } from '@nestjs/graphql';
import { TaxiOrderEntity } from '@ridy/database';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { OrderDTO } from './dto/order.dto';

@Injectable()
export class OrderSubscriptionService {
  constructor(
    @InjectPubSub()
    private pubSub: RedisPubSub,
  ) {}

  @Subscription(() => OrderDTO, {
    filter: (
      payload: { orderUpdated: TaxiOrderEntity },
      variables: { orderId: number },
      context,
    ) => {
      return variables.orderId == payload.orderUpdated.id;
    },
  })
  orderUpdated(@Args('orderId', { type: () => ID }) orderId: number) {
    return this.pubSub.asyncIterator('orderUpdated');
  }
}
