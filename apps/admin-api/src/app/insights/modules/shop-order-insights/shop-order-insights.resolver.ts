import { Args, Float, Query, Resolver } from '@nestjs/graphql';
import { ShopOrderInsightsService } from './shop-order-insights.service';
import { ShopDateRangePairInput } from './inputs/shop-date-range-pair.input';

@Resolver()
export class ShopOrderInsightsResolver {
  constructor(private shopOrderInsightsService: ShopOrderInsightsService) {}

  @Query(() => Float, {
    description:
      'Get the average delivery time for a shop within a date range in minutes',
  })
  async getShopAverageDeliveryTime(
    @Args('input', { type: () => ShopDateRangePairInput })
    input: ShopDateRangePairInput,
  ): Promise<number> {
    return this.shopOrderInsightsService.shopAverageDeliveryTime(input);
  }
}
