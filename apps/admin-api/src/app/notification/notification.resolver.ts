import { Args, CONTEXT, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotiifcationService } from './notification.service';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { UserContext } from '../auth/authenticated-admin';
import {
  AdminNotificationBase,
  AdminNotificationUnion,
} from './dtos/admin-notification.dto';
import { AdminNotificationType } from '@ridy/database';

@Resolver()
@UseGuards(JwtAuthGuard)
export class NotificationResolver {
  constructor(
    @Inject(CONTEXT)
    private readonly context: UserContext,
    private readonly notificationService: NotiifcationService,
  ) {}

  @Query(() => [AdminNotificationUnion])
  async notifications(
    @Args('type', { nullable: true, type: () => AdminNotificationType })
    type?: AdminNotificationType,
  ): Promise<Array<AdminNotificationBase>> {
    Logger.log(
      `Notifications for ${this.context.req.user.id}`,
      'NotificationResolver',
    );
    const notifications = await this.notificationService.getNotifications({
      operatorId: this.context.req.user.id,
      type,
    });
    return notifications;
  }

  @Mutation(() => Boolean)
  async markAsRead(
    @Args('notificationIds', { type: () => [ID] })
    notificationIds: number[],
  ): Promise<boolean> {
    return this.notificationService.markAsRead({
      operatorId: this.context.req.user.id,
      notificationIds,
    });
  }
}
