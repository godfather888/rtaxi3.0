import { Injectable } from '@nestjs/common';
import { Subscription } from '@nestjs/graphql';
import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { AdminNotificationUnion } from './dtos/admin-notification.dto';

@Injectable()
export class NotificationSubscriptionService {
  constructor(
    @InjectPubSub()
    private pubSub: RedisPubSub,
  ) {}

  @Subscription(() => AdminNotificationUnion)
  async notificationCreated() {
    return this.pubSub.asyncIterator('adminNotificationCreated');
  }
}
