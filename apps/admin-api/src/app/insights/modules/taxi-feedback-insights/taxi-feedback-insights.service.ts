import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackParameterEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { NameCountDTO } from '../../core/dto/name-count.dto';

@Injectable()
export class TaxiFeedbackInsightsService {
  constructor(
    @InjectRepository(FeedbackParameterEntity)
    private readonly feedbackParameterRepository: Repository<FeedbackParameterEntity>,
  ) {}

  async ratingPointPopularities(): Promise<NameCountDTO[]> {
    return this.feedbackParameterRepository
      .createQueryBuilder('parameter')
      .select('parameter.title', 'name')
      .addSelect('COUNT(feedback.id)', 'count')
      .innerJoin('parameter.feedbacks', 'feedback')
      .groupBy('parameter.id')
      .orderBy('count', 'DESC')
      .getRawMany();
  }
}
