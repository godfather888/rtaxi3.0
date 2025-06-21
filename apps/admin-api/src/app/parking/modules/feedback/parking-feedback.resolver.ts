import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ParkingFeedbackService } from './parking-feedback.service';
import { ParkingFeedbackDTO } from './dto/parking-feedback.dto';
import { ReviewStatus } from '@ridy/database';

@Resolver()
export class ParkingFeedbackResolver {
  constructor(
    private readonly parkingFeedbackService: ParkingFeedbackService,
  ) {}

  @Mutation(() => ParkingFeedbackDTO)
  async updateParkingFeedbackStatus(
    @Args('feedbackId', { type: () => ID }) feedbackId: number,
    @Args('status', { type: () => ReviewStatus }) status: ReviewStatus,
  ): Promise<ParkingFeedbackDTO> {
    return this.parkingFeedbackService.changeFeedbackStatus(feedbackId, status);
  }
}
