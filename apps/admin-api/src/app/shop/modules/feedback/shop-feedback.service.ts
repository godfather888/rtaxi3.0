import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewStatus } from '@ridy/database';
import { ShopFeedbackEntity } from '@ridy/database';
import { ShopEntity } from '@ridy/database';
import { In, Repository } from 'typeorm';

@Injectable()
export class ShopFeedbackService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(ShopFeedbackEntity)
    private readonly shopFeedbackRepository: Repository<ShopFeedbackEntity>,
  ) {}

  async recalculateShopScore(shopId: number): Promise<void> {
    const feedbacks = await this.shopFeedbackRepository.find({
      where: {
        shopId,
        status: In([ReviewStatus.Approved, ReviewStatus.ApprovedUnpublished]),
      },
    });
    const feedbackScores = feedbacks.map((feedback) => feedback.score);

    const totalScore = feedbackScores.reduce((acc, score) => acc + score, 0);

    const shopScore = totalScore / feedbackScores.length;

    await this.shopRepository.update(shopId, {
      ratingAggregate: {
        rating: shopScore,
      },
    });
  }

  async changeFeedbackStatus(
    feedbackId: number,
    status: ReviewStatus,
  ): Promise<ShopFeedbackEntity> {
    const feedback = await this.shopFeedbackRepository.findOneByOrFail({
      id: feedbackId,
    });
    feedback.status = status;
    await this.shopFeedbackRepository.save(feedback);
    await this.recalculateShopScore(feedback.shopId);
    return feedback;
  }
}
