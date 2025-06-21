import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplaintActivityType } from '@ridy/database';
import { ComplaintStatus } from '@ridy/database';
import { OperatorEntity } from '@ridy/database';
import { ParkingSupportRequestActivityEntity } from '@ridy/database';
import { ParkingSupportRequestEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { ShopSupportRequestActivityDTO } from '../shop/modules/support-request/dto/shop-support-request-activity.dto';

@Injectable()
export class ParkingSupportService {
  constructor(
    @InjectRepository(ParkingSupportRequestEntity)
    private parkSupportRequestRepository: Repository<ParkingSupportRequestEntity>,
    @InjectRepository(ParkingSupportRequestActivityEntity)
    private parkSupportRequestActivityRepository: Repository<ParkingSupportRequestActivityEntity>,
  ) {}

  async writeCommentOnParkingSupportRequest(input: {
    actorId: number;
    supportRequestId: number;
    comment: string;
  }) {
    const activity = new ParkingSupportRequestActivityEntity();
    activity.actorId = input.actorId;
    activity.comment = input.comment;
    activity.type = ComplaintActivityType.Comment;
    activity.supportRequestId = input.supportRequestId;
    await this.parkSupportRequestActivityRepository.save(activity);
  }

  async assignParkingSupportRequestToStaffs(input: {
    actorId: number;
    supportRequestId: number;
    staffIds: number[];
  }) {
    const supportRequest =
      await this.parkSupportRequestRepository.findOneOrFail({
        where: { id: input.supportRequestId },
        relations: { assignedToStaffs: true },
      });
    const unassignedFromStaffs = supportRequest.assignedToStaffs
      .filter((staff) => !input.staffIds.includes(staff.id))
      .map((staff) => staff.id);
    if (unassignedFromStaffs.length > 0) {
      const activity = new ParkingSupportRequestActivityEntity();
      activity.actorId = input.actorId;
      activity.type = ComplaintActivityType.UnassignFromOperators;
      activity.supportRequestId = input.supportRequestId;
      activity.unassignedFromStaffs = unassignedFromStaffs.map((id) => ({
        id,
      })) as unknown as OperatorEntity[];
      await this.parkSupportRequestActivityRepository.save(activity);
    }
    const activity = new ParkingSupportRequestActivityEntity();
    activity.actorId = input.actorId;
    activity.type = ComplaintActivityType.AssignToOperator;
    activity.supportRequestId = input.supportRequestId;
    activity.assignedToStaffs = input.staffIds
      .filter(
        (id) =>
          !supportRequest.assignedToStaffs.some((staff) => staff.id === id),
      )
      .map((id) => ({
        id,
      })) as unknown as OperatorEntity[];
    await this.parkSupportRequestActivityRepository.save(activity);
  }

  async updateParkingSupportRequestStatus(input: {
    actorId: number;
    supportRequestId: number;
    status: ComplaintStatus;
  }): Promise<ShopSupportRequestActivityDTO> {
    const activity = this.parkSupportRequestActivityRepository.create({
      actorId: input.actorId,
      type: ComplaintActivityType.StatusChange,
      supportRequestId: input.supportRequestId,
      statusTo: input.status,
    });
    await this.parkSupportRequestActivityRepository.save(activity);
    await this.parkSupportRequestRepository.update(input.supportRequestId, {
      status: input.status,
    });
    return activity;
  }
}
