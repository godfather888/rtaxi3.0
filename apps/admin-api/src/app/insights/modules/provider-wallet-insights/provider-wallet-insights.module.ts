import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderTransactionEntity } from '@ridy/database';
import { ProviderWalletEntity } from '@ridy/database';
import { ProviderWalletInsightsService } from './provider-wallet-insights.service';
import { ProviderWalletInsightsResolver } from './provider-wallet-insights.resolver';
import { InsightsHelperService } from '../../core/services/insights-helper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderWalletEntity, ProviderTransactionEntity]),
  ],
  providers: [
    ProviderWalletInsightsService,
    ProviderWalletInsightsResolver,
    InsightsHelperService,
  ],
})
export class ProviderWalletInsightsModule {}
