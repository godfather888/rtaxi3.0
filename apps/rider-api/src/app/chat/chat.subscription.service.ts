import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { Injectable } from '@nestjs/common';
import { Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { OrderMessageDTO } from './dto/order-message.dto';

@Injectable()
export class ChatSubscriptionService {
  constructor(
    @InjectPubSub()
    private pubSub: RedisPubSub,
  ) {}

  @Subscription(() => OrderMessageDTO, {
    filter: (
      payload: { newMessageReceived: OrderMessageDTO; riderId: number },
      variables,
      context,
    ) => {
      return context.req.extra.user.id == payload.riderId;
    },
    resolve: (payload: { newMessageReceived: OrderMessageDTO }) => {
      payload.newMessageReceived.sentAt = new Date(
        payload.newMessageReceived.sentAt,
      );
      return payload.newMessageReceived;
    },
  })
  newMessageReceived() {
    return this.pubSub.asyncIterator('newMessageForRider');
  }
}
