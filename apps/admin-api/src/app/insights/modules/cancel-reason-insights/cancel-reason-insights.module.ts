import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderCancelReasonEntity } from '@ridy/database';
import { TaxiOrderEntity } from '@ridy/database';
import { CancelReasonInsightsService } from './cancel-reason-insights.service';
import { CancelReasonInsightsResolver } from './cancel-reason-insights.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderCancelReasonEntity, TaxiOrderEntity]),
  ],
  providers: [CancelReasonInsightsService, CancelReasonInsightsResolver],
})
export class CancelReasonInsightsModule {}
