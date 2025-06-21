import { Args, CONTEXT, Mutation, Resolver } from '@nestjs/graphql';
import { ParkingSupportRequestService } from './parking-support-request.service';
import { Inject, UseGuards } from '@nestjs/common';
import type { UserContext } from '../../../auth/authenticated-admin';
import { ParkingSupportRequestActivityDTO } from './dto/parking-support-request-activity.dto';
import { CreateParkingSupportRequestCommentInput } from './dto/create-parking-support-request-comment.input';
import { AssignParkingSupportRequestInput } from './dto/assign-parking-support-request.input';
import { ChangeParkingSupportRequestStatusInput } from './dto/change-parking-support-request-status.input';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class ParkingSupportRequestResolver {
  constructor(
    private parkingSupportRequestService: ParkingSupportRequestService,
    @Inject(CONTEXT)
    private context: UserContext,
  ) {}

  @Mutation(() => ParkingSupportRequestActivityDTO)
  async addCommentToParkingSupportRequest(
    @Args('input') input: CreateParkingSupportRequestCommentInput,
  ): Promise<ParkingSupportRequestActivityDTO> {
    return this.parkingSupportRequestService.addCommentToParkingSupportRequest({
      staffId: this.context.req.user.id,
      input,
    });
  }

  @Mutation(() => ParkingSupportRequestActivityDTO)
  async assignParkingSupportRequestToStaff(
    @Args('input') input: AssignParkingSupportRequestInput,
  ): Promise<ParkingSupportRequestActivityDTO> {
    return this.parkingSupportRequestService.assignParkingSupportRequestToStaff(
      {
        staffId: this.context.req.user.id,
        input,
      },
    );
  }

  @Mutation(() => ParkingSupportRequestActivityDTO)
  async changeParkingSupportRequestStatus(
    @Args('input') input: ChangeParkingSupportRequestStatusInput,
  ): Promise<ParkingSupportRequestActivityDTO> {
    return this.parkingSupportRequestService.changeParkingSupportRequestStatus({
      staffId: this.context.req.user.id,
      input,
    });
  }
}
