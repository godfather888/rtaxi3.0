import { Query, Resolver } from '@nestjs/graphql';
import { CancelReasonInsightsService } from './cancel-reason-insights.service';
import { NameCountDTO } from '../../core/dto/name-count.dto';
import { UserTypeCountPairDTO } from '../../core/dto/user-type-count-pair.dto';

@Resolver()
export class CancelReasonInsightsResolver {
  constructor(
    private readonly cancelReasonInsightsService: CancelReasonInsightsService,
  ) {}

  @Query(() => [NameCountDTO])
  async cancelReasonPopularityByName(): Promise<NameCountDTO[]> {
    return this.cancelReasonInsightsService.cancelReasonPopularityByName();
  }

  @Query(() => [UserTypeCountPairDTO])
  async cancelReasonPopularityByUserType(): Promise<UserTypeCountPairDTO[]> {
    return this.cancelReasonInsightsService.cancelReasonPopularityByUserType();
  }
}
