import { Module } from '@nestjs/common';
import { ParkingInsightsService } from './parking-insights.service';
import { ParkingInsightsResolver } from './parking-insights.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkSpotEntity } from '@ridy/database';
import { ParkingWalletEntity } from '@ridy/database';
import { ParkingTransactionEntity } from '@ridy/database';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ParkSpotEntity,
      ParkingWalletEntity,
      ParkingTransactionEntity,
    ]),
  ],
  providers: [ParkingInsightsService, ParkingInsightsResolver],
})
export class ParkingInsightsModule {}
