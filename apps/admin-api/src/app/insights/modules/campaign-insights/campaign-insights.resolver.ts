import { Args, Resolver, Query, ID } from '@nestjs/graphql';
import { CampaignInsightsService } from './campaign-insights.service';
import { UsedUnusedCountPairDTO } from '../../core/dto/used-unused-count-pair.dto';

@Resolver()
export class CampaignInsightsResolver {
  constructor(private campaignInsightsService: CampaignInsightsService) {}

  @Query(() => UsedUnusedCountPairDTO)
  async getUsedUnusedCountPair(
    @Args('campaignId', { type: () => ID }) campaignId: number,
  ): Promise<UsedUnusedCountPairDTO> {
    return this.campaignInsightsService.getUsedUnusedCountPair({
      campaignId,
    });
  }
}
