import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '@ridy/database';
import { Repository } from 'typeorm';

@Injectable()
export class DriverTendencyService {
  constructor(
    @InjectRepository(CustomerEntity)
    private riderRepo: Repository<CustomerEntity>,
  ) {}

  async deleteFavoriteDriver(riderId: number, driverId: number): Promise<void> {
    await this.riderRepo
      .createQueryBuilder()
      .relation(CustomerEntity, 'favoriteDrivers')
      .of(riderId)
      .remove(driverId);
  }
}
