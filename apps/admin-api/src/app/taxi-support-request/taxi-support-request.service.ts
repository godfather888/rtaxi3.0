import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxiSupportRequestActivityEntity } from '@ridy/database';
import { TaxiSupportRequestEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { CreateTaxiSupportRequestCommentInput } from './dto/create-taxi-support-request-comment.input';
import { ComplaintActivityType } from '@ridy/database';
import { OperatorEntity } from '@ridy/database';
import { AssignTaxiSupportRequestInput } from './dto/assign-taxi-support-request.input';
import { ChangeTaxiSupportRequestStatusInput } from './dto/change-taxi-support-request-status.input';

@Injectable()
export class TaxiSupportRequestService {
  constructor(
    @InjectRepository(TaxiSupportRequestEntity)
    private taxiSupportRequestRepository: Repository<TaxiSupportRequestEntity>,
    @InjectRepository(TaxiSupportRequestActivityEntity)
    private taxiSupportRequestActivityRepository: Repository<TaxiSupportRequestActivityEntity>,
  ) {}

  async addCommentToTaxiSupportRequest(input: {
    staffId: number;
    input: CreateTaxiSupportRequestCommentInput;
  }): Promise<TaxiSupportRequestActivityEntity> {
    const activity = this.taxiSupportRequestActivityRepository.create();
    activity.actorId = input.staffId;
    activity.comment = input.input.comment;
    activity.complaintId = input.input.supportRequestId;
    activity.type = ComplaintActivityType.Comment;
    return this.taxiSupportRequestActivityRepository.save(activity);
  }

  async assignTaxiSupportRequestToStaff(input: {
    staffId: number;
    input: AssignTaxiSupportRequestInput;
  }): Promise<TaxiSupportRequestActivityEntity> {
    const activity = this.taxiSupportRequestActivityRepository.create();
    activity.actorId = input.staffId;
    activity.assignedToStaffs = input.input.staffIds.map((id) => ({
      id,
    })) as unknown as OperatorEntity[];
    activity.complaintId = input.input.supportRequestId;
    activity.type = ComplaintActivityType.AssignToOperator;
    return this.taxiSupportRequestActivityRepository.save(activity);
  }

  async changeTaxiSupportRequestStatus(input: {
    staffId: number;
    input: ChangeTaxiSupportRequestStatusInput;
  }): Promise<TaxiSupportRequestActivityEntity> {
    const supportRequest = await this.taxiSupportRequestRepository.findOneBy({
      id: input.input.supportRequestId,
    });
    const activity = this.taxiSupportRequestActivityRepository.create();
    activity.actorId = input.staffId;
    activity.complaintId = input.input.supportRequestId;
    activity.type = ComplaintActivityType.StatusChange;
    activity.statusFrom = supportRequest.status;
    activity.statusTo = input.input.status;
    return this.taxiSupportRequestActivityRepository.save(activity);
  }
}
