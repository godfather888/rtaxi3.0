import { Args, Query, Resolver } from '@nestjs/graphql';
import { CustomersInsightsService } from './customers-insights.service';
import { CustomersPerAppDTO } from '../../core/dto/customers-per-app.dto';
import { RevenuePerApp } from '../../core/dto/revenue-per-app.input';
import { ChartFilterInput } from '../../core/dto/chart-filter.input';
import { PlatformDistributionDTO } from '../../core/dto/platform-distribution.dto';
import { LeaderboardItemDTO } from '../../core/dto/leaderboard-item.dto';
import { GenderDistributionDTO } from '../../core/dto/gender-distribution.dto';
import { RetentionRateDTO } from '../../core/dto/retention-rate.dto';
import { ActiveInactiveUsersDTO } from '../../core/dto/active-inactive-users.dto';
import { CountryDistributionDTO } from '../../core/dto/country-distribution.dto';

@Resolver()
export class CustomersInsightsResolver {
  constructor(
    private readonly customersInsightsService: CustomersInsightsService,
  ) {}

  @Query(() => [CustomersPerAppDTO])
  async customersPerApp(): Promise<CustomersPerAppDTO[]> {
    return this.customersInsightsService.getCustomersPerApp();
  }

  @Query(() => [RevenuePerApp])
  async revenuePerApp(
    @Args('input', { type: () => ChartFilterInput }) input: ChartFilterInput,
  ): Promise<RevenuePerApp[]> {
    return this.customersInsightsService.revenuePerApp(input);
  }

  @Query(() => [PlatformDistributionDTO])
  async customerPlatformDistribution(): Promise<PlatformDistributionDTO[]> {
    return this.customersInsightsService.customerPlatformDistribution();
  }

  @Query(() => [LeaderboardItemDTO])
  async topSpendingCustomers(): Promise<LeaderboardItemDTO[]> {
    return this.customersInsightsService.getTopSpendingCustomers();
  }

  @Query(() => [GenderDistributionDTO])
  async genderDistribution(): Promise<GenderDistributionDTO[]> {
    return this.customersInsightsService.genderDistribution();
  }

  @Query(() => [RetentionRateDTO])
  async retentionRate(
    @Args('input', { type: () => ChartFilterInput }) input: ChartFilterInput,
  ): Promise<RetentionRateDTO[]> {
    return this.customersInsightsService.retentionRate(input);
  }

  @Query(() => [ActiveInactiveUsersDTO])
  async activeInactiveUsers(
    @Args('input', { type: () => ChartFilterInput }) input: ChartFilterInput,
  ): Promise<ActiveInactiveUsersDTO[]> {
    return this.customersInsightsService.activeInactiveUsers(input);
  }

  @Query(() => [CountryDistributionDTO])
  async countryDistribution(): Promise<CountryDistributionDTO[]> {
    return this.customersInsightsService.countryDistribution();
  }
}
