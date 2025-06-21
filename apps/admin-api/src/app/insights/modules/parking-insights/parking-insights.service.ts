import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingTransactionEntity } from '@ridy/database';
import { LeaderboardItemDTO } from '../../core/dto/leaderboard-item.dto';

@Injectable()
export class ParkingInsightsService {
  constructor(
    @InjectRepository(ParkingTransactionEntity)
    private readonly parkingTransactionRepository: Repository<ParkingTransactionEntity>,
  ) {}

  async topEarningParkSpots(input: {
    currency: string;
  }): Promise<LeaderboardItemDTO[]> {
    const topEarningParkSpots = await this.parkingTransactionRepository
      .createQueryBuilder('parkingTransaction')
      .select('SUM(parkingTransaction.amount)', 'totalAmount')
      .addSelect('COUNT(parkingTransaction.id)', 'totalTransactions')
      .addSelect('ANY_VALUE(parkSpot.currency)', 'currency')
      .addSelect('parkSpot.id', 'id')
      .addSelect('media.address', 'avatarUrl')
      .addSelect('parkSpot.name', 'name')
      .innerJoin('parkingTransaction.parkSpot', 'parkSpot')
      .innerJoin('parkSpot.media', 'media')
      .where('parkingTransaction.currency = :currency', {
        currency: input.currency,
      })
      .groupBy('parkSpot.id')
      .orderBy('totalAmount', 'DESC')
      .limit(10)
      .getRawMany();
    return topEarningParkSpots;
  }
}
