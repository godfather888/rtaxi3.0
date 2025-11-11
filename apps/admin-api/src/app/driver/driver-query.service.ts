import { QueryService } from '@ptc-org/nestjs-query-core';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { DriverDTO } from './dto/driver.dto';

@QueryService(DriverDTO)
export class DriverQueryService extends TypeOrmQueryService<DriverEntity> {
  constructor(
    @InjectRepository(DriverEntity)
    driverRepo: Repository<DriverEntity>,
  ) {
    super(driverRepo, { useSoftDelete: true });
  }
}

