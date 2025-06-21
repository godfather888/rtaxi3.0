import { CONTEXT, Query, Resolver } from '@nestjs/graphql';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksSummaryDTO } from './dto/feedbacks-summary.dto';
import { Inject, UseGuards } from '@nestjs/common';
import { UserContext } from '../auth/authenticated-user';
import { GqlAuthGuard } from '../auth/jwt-gql-auth.guard';

@Resolver()
@UseGuards(GqlAuthGuard)
export class FeedbacksResolver {
  constructor(
    private feedbacksService: FeedbacksService,
    @Inject(CONTEXT) private userContext: UserContext,
  ) {}

  @Query(() => FeedbacksSummaryDTO)
  async feedbacksSummary(): Promise<FeedbacksSummaryDTO> {
    return this.feedbacksService.getFeedbacksSummary({
      driverId: this.userContext.req.user.id,
    });
  }
}
