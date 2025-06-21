import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '@ridy/database';
import { CustomerSessionEntity } from '@ridy/database';
import { ProviderTransactionEntity } from '@ridy/database';
import { CustomersInsightsService } from './customers-insights.service';
import { CustomersInsightsResolver } from './customers-insights.resolver';
import { RiderTransactionEntity } from '@ridy/database';
import { TaxiOrderEntity } from '@ridy/database';
import { ShopOrderEntity } from '@ridy/database';
import { ParkOrderEntity } from '@ridy/database';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEntity,
      CustomerSessionEntity,
      ProviderTransactionEntity,
      RiderTransactionEntity,
      TaxiOrderEntity,
      ShopOrderEntity,
      ParkOrderEntity,
    ]),
  ],
  providers: [CustomersInsightsService, CustomersInsightsResolver],
  exports: [],
})
export class CustomerInsightsModule {}
