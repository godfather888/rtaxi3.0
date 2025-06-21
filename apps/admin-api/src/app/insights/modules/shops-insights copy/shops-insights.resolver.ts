import { Query, Resolver } from '@nestjs/graphql';
import { ShopsInsightsService } from './shops-insights.service';
import { LeaderboardItemDTO } from '../../core/dto/leaderboard-item.dto';

@Resolver()
export class ShopsInsightsResolver {
  constructor(
    private readonly shopsInsightsService: ShopsInsightsService,
  ) {}

  @Query(() => [LeaderboardItemDTO])
  async topEarningShops(): Promise<LeaderboardItemDTO[]> {
    return this.shopsInsightsService.getTopEarningShops();
  }
}
