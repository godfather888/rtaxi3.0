import { Module } from '@nestjs/common';
import { PlatformOverviewService } from './platform-overview.service';
import { PlatformOverviewResolver } from './platform-overview.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxiOrderEntity } from '@ridy/database';
import { ShopOrderEntity } from '@ridy/database';
import { ParkOrderEntity } from '@ridy/database';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaxiOrderEntity,
      ShopOrderEntity,
      ParkOrderEntity,
    ]),
  ],
  providers: [PlatformOverviewService, PlatformOverviewResolver],
})
export class PlatformOverviewModule {}
