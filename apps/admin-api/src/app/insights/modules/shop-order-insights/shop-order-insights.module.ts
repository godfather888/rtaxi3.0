import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopOrderEntity } from '@ridy/database';
import { ShopOrderInsightsService } from './shop-order-insights.service';
import { ShopOrderInsightsResolver } from './shop-order-insights.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ShopOrderEntity])],
  providers: [ShopOrderInsightsService, ShopOrderInsightsResolver],
})
export class ShopOrderInsightsModule {}
