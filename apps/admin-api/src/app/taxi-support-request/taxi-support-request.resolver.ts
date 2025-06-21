import { Args, CONTEXT, Mutation, Resolver } from '@nestjs/graphql';
import { TaxiSupportRequestService } from './taxi-support-request.service';
import { Inject, UseGuards } from '@nestjs/common';
import type { UserContext } from '../auth/authenticated-admin';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TaxiSupportRequestActivityEntity } from '@ridy/database';
import { CreateTaxiSupportRequestCommentInput } from './dto/create-taxi-support-request-comment.input';
import { AssignTaxiSupportRequestInput } from './dto/assign-taxi-support-request.input';
import { ChangeTaxiSupportRequestStatusInput } from './dto/change-taxi-support-request-status.input';
import { TaxiSupportRequestActivityDTO } from './dto/taxi-support-request-activity.dto';

@Resolver()
@UseGuards(JwtAuthGuard)
export class TaxiSupportRequestResolver {
  constructor(
    private readonly taxiSupportRequestService: TaxiSupportRequestService,
    @Inject(CONTEXT)
    private context: UserContext,
  ) {}

  @Mutation(() => TaxiSupportRequestActivityDTO)
  async addCommentToTaxiSupportRequest(
    @Args('input') input: CreateTaxiSupportRequestCommentInput,
  ): Promise<TaxiSupportRequestActivityEntity> {
    return this.taxiSupportRequestService.addCommentToTaxiSupportRequest({
      staffId: this.context.req.user.id,
      input,
    });
  }

  @Mutation(() => TaxiSupportRequestActivityDTO)
  async assignTaxiSupportRequestToStaff(
    @Args('input') input: AssignTaxiSupportRequestInput,
  ): Promise<TaxiSupportRequestActivityEntity> {
    return this.taxiSupportRequestService.assignTaxiSupportRequestToStaff({
      staffId: this.context.req.user.id,
      input,
    });
  }

  @Mutation(() => TaxiSupportRequestActivityDTO)
  async changeTaxiSupportRequestStatus(
    @Args('input') input: ChangeTaxiSupportRequestStatusInput,
  ): Promise<TaxiSupportRequestActivityEntity> {
    return this.taxiSupportRequestService.changeTaxiSupportRequestStatus({
      staffId: this.context.req.user.id,
      input,
    });
  }
}
