import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopSupportRequestActivityEntity } from '@ridy/database';
import { ShopSupportRequestEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { CreateShopSupportRequestCommentInput } from './dto/create-shop-support-request-comment.input';
import { ComplaintActivityType } from '@ridy/database';
import { AssignShopSupportRequestInput } from './dto/assign-shop-support-request.input';
import { OperatorEntity } from '@ridy/database';
import { ChangeShopSupportRequestStatusInput } from './dto/change-shop-support-request-status.input';

@Injectable()
export class ShopSupportRequestService {
  constructor(
    @InjectRepository(ShopSupportRequestEntity)
    private shopSupportRequestRepository: Repository<ShopSupportRequestEntity>,
    @InjectRepository(ShopSupportRequestActivityEntity)
    private shopSupportRequestActivityRepository: Repository<ShopSupportRequestActivityEntity>,
  ) {}

  async addCommentToShopSupportRequest(input: {
    staffId: number;
    input: CreateShopSupportRequestCommentInput;
  }): Promise<ShopSupportRequestActivityEntity> {
    const activity = this.shopSupportRequestActivityRepository.create();
    activity.actorId = input.staffId;
    activity.comment = input.input.comment;
    activity.supportRequestId = input.input.supportRequestId;
    activity.type = ComplaintActivityType.Comment;
    return this.shopSupportRequestActivityRepository.save(activity);
  }

  async assignShopSupportRequestToStaff(input: {
    staffId: number;
    input: AssignShopSupportRequestInput;
  }): Promise<ShopSupportRequestActivityEntity> {
    const activity = this.shopSupportRequestActivityRepository.create();
    activity.actorId = input.staffId;
    activity.assignedToStaffs = input.input.staffIds.map((id) => ({
      id,
    })) as unknown as OperatorEntity[];
    activity.supportRequestId = input.input.supportRequestId;
    activity.type = ComplaintActivityType.AssignToOperator;
    return this.shopSupportRequestActivityRepository.save(activity);
  }

  async changeShopSupportRequestStatus(input: {
    staffId: number;
    input: ChangeShopSupportRequestStatusInput;
  }): Promise<ShopSupportRequestActivityEntity> {
    const supportRequest = await this.shopSupportRequestRepository.findOneBy({
      id: input.input.supportRequestId,
    });
    const activity = this.shopSupportRequestActivityRepository.create();
    activity.actorId = input.staffId;
    activity.supportRequestId = input.input.supportRequestId;
    activity.type = ComplaintActivityType.StatusChange;
    activity.statusFrom = supportRequest.status;
    activity.statusTo = input.input.status;
    return this.shopSupportRequestActivityRepository.save(activity);
  }
}
