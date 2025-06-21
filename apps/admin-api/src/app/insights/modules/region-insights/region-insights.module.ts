import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from '@ridy/database';
import { RegionInsightsService } from './region-insights.service';
import { RegionInsightsResolver } from './region-insights.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([RegionEntity])],
  providers: [RegionInsightsService, RegionInsightsResolver],
})
export class RegionInsightsModule {}
