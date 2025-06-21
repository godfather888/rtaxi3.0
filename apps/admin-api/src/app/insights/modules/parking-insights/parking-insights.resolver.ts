import { Args, Query, Resolver } from '@nestjs/graphql';
import { ParkingInsightsService } from './parking-insights.service';
import { LeaderboardItemDTO } from '../../core/dto/leaderboard-item.dto';

@Resolver()
export class ParkingInsightsResolver {
  constructor(private parkingInsightsService: ParkingInsightsService) {}

  @Query(() => [LeaderboardItemDTO])
  async topEarningParkSpots(
    @Args('currency', { type: () => String }) currency: string,
  ): Promise<LeaderboardItemDTO[]> {
    return this.parkingInsightsService.topEarningParkSpots({ currency });
  }
}
