import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, MoreThan, Not, Raw } from 'typeorm';
import { FeedbackEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { FeedbacksSummaryDTO } from './dto/feedbacks-summary.dto';
import { DriverEntity } from '@ridy/database';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(FeedbackEntity)
    private feedbackRepository: Repository<FeedbackEntity>,
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
  ) {}

  async getFeedbacksSummary(input: {
    driverId: number;
  }): Promise<FeedbacksSummaryDTO> {
    const driver = await this.driverRepository.findOneOrFail({
      where: { id: input.driverId },
    });
    const goodFeedbacks = await this.feedbackRepository.find({
      where: {
        driverId: driver.id,
        score: MoreThan(90),
        description: Not(IsNull()),
      },
      relations: ['request.service', 'parameters'],
    });
    const points = await this.driverRepository.query(
      `
          SELECT 
              review_parameter.title,
              ANY_VALUE(review_parameter.isGood) AS isGood,
              COUNT(review_parameter.id) AS count
          FROM
              review_parameter_feedbacks_request_review
          INNER JOIN review_parameter on review_parameter.id = review_parameter_feedbacks_request_review.reviewParameterId
          INNER JOIN request_review on request_review.id = review_parameter_feedbacks_request_review.requestReviewId
          WHERE
              request_review.driverId = ?
          GROUP BY
              review_parameter.title
          ORDER BY isGood DESC, count DESC`,
      [input.driverId],
    );
    const goodPoints = points.filter((p) => p.isGood).map((p) => p.title);
    const badPoints = points.filter((p) => !p.isGood).map((p) => p.title);
    return {
      averageRating: driver.rating,
      goodReviews: goodFeedbacks.map((feedback) => ({
        serviceName: feedback.request.service?.name ?? 'Deleted Service',
        rating: feedback.score,
        review: feedback.description,
        goodPoints: feedback.parameters
          .filter((p) => p.isGood)
          .map((p) => p.title),
      })),
      goodPoints,
      badPoints,
    };
  }
}
