import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { NameCountDTO } from '../../core/dto/name-count.dto';

@Injectable()
export class RegionInsightsService {
  constructor(
    @InjectRepository(RegionEntity)
    private regionRepository: Repository<RegionEntity>,
  ) {}

  async getPopularRegionsByTaxiOrders(): Promise<NameCountDTO> {
    return this.regionRepository
      .createQueryBuilder('region')
      .select('region.name', 'name')
      .addSelect('COUNT(taxiOrder.id)', 'count')
      .leftJoin('region.taxiOrders', 'taxiOrder')
      .groupBy('region.id')
      .orderBy('count', 'DESC')
      .getRawOne();
  }
}
