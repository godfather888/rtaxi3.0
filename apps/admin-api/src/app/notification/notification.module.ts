import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisPubSubProvider } from '@ridy/database';
import { AdminNotificationEntity } from '@ridy/database';
import { NotificationSubscriptionService } from './notification-subscription.service';
import { NotificationResolver } from './notification.resolver';
import { NotiifcationService } from './notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminNotificationEntity])],
  providers: [
    NotiifcationService,
    NotificationResolver,
    NotificationSubscriptionService,
    RedisPubSubProvider.provider(),
  ],
  exports: [NotiifcationService],
})
export class NotificationModule {}
