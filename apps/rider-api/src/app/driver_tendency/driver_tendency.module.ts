import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '@ridy/database';
import { DriverTendencyService } from './driver_tendeny.service';
import { DriverTendencyResolver } from './driver_tendency.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  providers: [DriverTendencyService, DriverTendencyResolver],
})
export class DriverTendencyModule {}
