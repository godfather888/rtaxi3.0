import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxiOrderEntity } from '@ridy/database';

@Module({
  imports: [TypeOrmModule.forFeature([TaxiOrderEntity])],
})
export class TaxiOrderInsightsModule {}
