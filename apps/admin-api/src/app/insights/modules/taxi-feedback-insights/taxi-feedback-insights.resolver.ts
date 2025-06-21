import { Query, Resolver } from '@nestjs/graphql';
import { TaxiFeedbackInsightsService } from './taxi-feedback-insights.service';
import { NameCountDTO } from '../../core/dto/name-count.dto';

@Resolver()
export class TaxiFeedbackInsightsResolver {
  constructor(
    private readonly taxiFeedbackInsightsService: TaxiFeedbackInsightsService,
  ) {}

  @Query(() => [NameCountDTO])
  async ratingPointPopularities(): Promise<NameCountDTO[]> {
    return this.taxiFeedbackInsightsService.ratingPointPopularities();
  }
}
