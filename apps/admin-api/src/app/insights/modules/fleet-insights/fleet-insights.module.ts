import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FleetEntity } from '@ridy/database';
import { FleetInsightsService } from './fleet-insights.service';
import { FleetInsightsResolver } from './fleet-insights.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([FleetEntity])],
  providers: [FleetInsightsService, FleetInsightsResolver],
})
export class FleetInsightsModule {}
