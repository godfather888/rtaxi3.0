import { Resolver, Query } from '@nestjs/graphql';
import { RegionInsightsService } from './region-insights.service';
import { NameCountDTO } from '../../core/dto/name-count.dto';

@Resolver()
export class RegionInsightsResolver {
  constructor(private regionInsightsService: RegionInsightsService) {}

  @Query(() => [NameCountDTO])
  async popularRegionsByTaxiOrders(): Promise<NameCountDTO> {
    return this.regionInsightsService.getPopularRegionsByTaxiOrders();
  }
}
