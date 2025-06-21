import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopTransactionEntity } from '@ridy/database';
import { ShopsInsightsResolver } from './shops-insights.resolver';
import { ShopsInsightsService } from './shops-insights.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShopTransactionEntity])],
  providers: [ShopsInsightsResolver, ShopsInsightsService],
})
export class ShopsInsightsModule {}
