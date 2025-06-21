import { Module } from '@nestjs/common';
import { CustomerInsightsModule } from './modules/customer-insights/customers-insights.module';
import { RegionInsightsModule } from './modules/region-insights/region-insights.module';
import { TaxiFeedbackInsightsModule } from './modules/taxi-feedback-insights/taxi-feedback-insights.module';
import { CancelReasonInsightsModule } from './modules/cancel-reason-insights/cancel-reason-insights.module';
import { CampaignInsightsModule } from './modules/campaign-insights/campaign-insights.module';
import { FleetInsightsModule } from './modules/fleet-insights/fleet-insights.module';
import { ShopOrderInsightsModule } from './modules/shop-order-insights/shop-order-insights.module';
import { TaxiOrderInsightsModule } from './modules/taxi-order-insights/taxi-order-insights.module';
import { ProviderWalletInsightsModule } from './modules/provider-wallet-insights/provider-wallet-insights.module';
import { ParkingInsightsModule } from './modules/parking-insights/parking-insights.module';
import { DriversInsightsModule } from './modules/drivers-insights/drivers-insights.module';
import { ShopsInsightsModule } from './modules/shops-insights/shops-insights.module';

@Module({
  imports: [
    CustomerInsightsModule,
    DriversInsightsModule,
    ShopsInsightsModule,
    RegionInsightsModule,
    TaxiFeedbackInsightsModule,
    CancelReasonInsightsModule,
    CampaignInsightsModule,
    FleetInsightsModule,
    TaxiOrderInsightsModule,
    ShopOrderInsightsModule,
    ProviderWalletInsightsModule,
    ParkingInsightsModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class InsightsModule {}
