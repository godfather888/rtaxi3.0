import { Args, Query, Resolver } from '@nestjs/graphql';
import { DriversInsightsService } from './drivers-insights.service';
import { LeaderboardItemDTO } from '../../core/dto/leaderboard-item.dto';
import { ActiveInactiveUsersDTO } from '../../core/dto/active-inactive-users.dto';

@Resolver()
export class DriversInsightsResolver {
  constructor(
    private readonly driversInsightsService: DriversInsightsService,
  ) {}

  @Query(() => [LeaderboardItemDTO])
  async topEarningDrivers(
    @Args('currency', { type: () => String }) currency: string,
  ): Promise<LeaderboardItemDTO[]> {
    return this.driversInsightsService.getTopEarningDrivers({ currency });
  }

  @Query(() => [LeaderboardItemDTO])
  async topTripsCompletedDrivers(): Promise<LeaderboardItemDTO[]> {
    return this.driversInsightsService.topTripsCompletedDrivers();
  }

  @Query(() => [ActiveInactiveUsersDTO])
  async activeInactiveDrivers(): Promise<ActiveInactiveUsersDTO[]> {
    return this.driversInsightsService.getActiveInactiveDrivers();
  }
}
