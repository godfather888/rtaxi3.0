import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignCodeEntity } from '@ridy/database';
import { CampaignEntity } from '@ridy/database';
import { CampaignInsightsService } from './campaign-insights.service';
import { CampaignInsightsResolver } from './campaign-insights.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignEntity, CampaignCodeEntity])],
  providers: [CampaignInsightsService, CampaignInsightsResolver],
})
export class CampaignInsightsModule {}
