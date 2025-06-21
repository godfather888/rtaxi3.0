import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewStatus } from '@ridy/database';
import { ParkingFeedbackEntity } from '@ridy/database';
import { ParkSpotEntity } from '@ridy/database';
import { In, Repository } from 'typeorm';

@Injectable()
export class ParkingFeedbackService {
  constructor(
    @InjectRepository(ParkSpotEntity)
    private readonly parkingRepository: Repository<ParkSpotEntity>,
    @InjectRepository(ParkingFeedbackEntity)
    private readonly parkingFeedbackRepository: Repository<ParkingFeedbackEntity>,
  ) {}

  async recalculateParkingScore(parkSpotId: number): Promise<void> {
    const feedbacks = await this.parkingFeedbackRepository.find({
      where: {
        parkSpotId: parkSpotId,
        status: In([ReviewStatus.Approved, ReviewStatus.ApprovedUnpublished]),
      },
    });
    const feedbackScores = feedbacks.map((feedback) => feedback.score);

    const totalScore = feedbackScores.reduce((acc, score) => acc + score, 0);

    const parkingScore = totalScore / feedbackScores.length;

    await this.parkingRepository.update(parkSpotId, {
      ratingAggregate: {
        rating: parkingScore,
      },
    });
  }

  async changeFeedbackStatus(
    feedbackId: number,
    status: ReviewStatus,
  ): Promise<ParkingFeedbackEntity> {
    const feedback = await this.parkingFeedbackRepository.findOneByOrFail({
      id: feedbackId,
    });
    feedback.status = status;
    await this.parkingFeedbackRepository.save(feedback);
    await this.recalculateParkingScore(feedback.parkSpotId);
    return feedback;
  }
}
