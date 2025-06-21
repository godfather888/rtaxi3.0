import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminNotificationEntity } from '@ridy/database';
import { AdminNotificationType } from '@ridy/database';
import { In, Repository } from 'typeorm';

@Injectable()
export class NotiifcationService {
  constructor(
    @InjectRepository(AdminNotificationEntity)
    private shopNotificationRepository: Repository<AdminNotificationEntity>,
  ) {}

  async getNotifications(input: {
    operatorId: number;
    type?: AdminNotificationType;
  }): Promise<AdminNotificationEntity[]> {
    return this.shopNotificationRepository.find({
      where: {
        operatorId: input.operatorId,
        type: input.type,
      },
      relations: {
        taxiSupportRequest: true,
        shopSupportRequest: true,
        parkingSupportRequest: true,
        shopPendingVerification: true,
        parkSpotPendingVerification: true,
        parkingReviewPendingApproval: true,
        shopReviewPendingApproval: true,
      },
    });
  }

  async markAsRead(input: {
    operatorId: number;
    notificationIds: number[];
  }): Promise<boolean> {
    await this.shopNotificationRepository.update(
      {
        operatorId: input.operatorId,
        id: In(input.notificationIds),
      },
      {
        readAt: new Date(),
      },
    );
    return true;
  }
}
