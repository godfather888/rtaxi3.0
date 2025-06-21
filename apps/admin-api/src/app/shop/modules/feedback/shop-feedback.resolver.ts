import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ShopFeedbackService } from './shop-feedback.service';
import { ShopFeedbackDTO } from './dto/shop-feedback.dto';
import { ReviewStatus } from '@ridy/database';

@Resolver()
export class ShopFeedbackResolver {
  constructor(private readonly shopFeedbackService: ShopFeedbackService) {}

  @Mutation(() => ShopFeedbackDTO)
  async updateShopFeedbackStatus(
    @Args('feedbackId', { type: () => ID }) feedbackId: number,
    @Args('status', { type: () => ReviewStatus }) status: ReviewStatus,
  ): Promise<ShopFeedbackDTO> {
    return this.shopFeedbackService.changeFeedbackStatus(feedbackId, status);
  }
}
