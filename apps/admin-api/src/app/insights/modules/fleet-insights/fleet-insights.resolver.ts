import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { FleetInsightsService } from './fleet-insights.service';
import { FinancialTimeline } from '../../core/dto/financial-timeline.dto';
import { ChartFilterInput } from '../../core/dto/chart-filter.input';

@Resolver()
export class FleetInsightsResolver {
  constructor(private fleetInsightsService: FleetInsightsService) {}

  @Query(() => [FinancialTimeline])
  async fleetIncome(
    @Args('fleetId', { type: () => ID }) fleetId: number,
    @Args('input', { type: () => ChartFilterInput }) input: ChartFilterInput,
  ): Promise<FinancialTimeline[]> {
    return this.fleetInsightsService.getFleetIncome(fleetId, input);
  }
}
