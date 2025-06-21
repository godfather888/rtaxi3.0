import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverTransactionEntity } from '@ridy/database';
import { DriversInsightsResolver } from './drivers-insights.resolver';
import { DriversInsightsService } from './drivers-insights.service';
import { DriverEntity } from '@ridy/database';

@Module({
  imports: [TypeOrmModule.forFeature([DriverTransactionEntity, DriverEntity])],
  providers: [DriversInsightsResolver, DriversInsightsService],
})
export class DriversInsightsModule {}
