import { Injectable } from '@nestjs/common';
import { LeaderboardItemDTO } from '../../core/dto/leaderboard-item.dto';
import { Repository } from 'typeorm';
import { ShopTransactionEntity } from '@ridy/database';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShopsInsightsService {
  constructor(
    @InjectRepository(ShopTransactionEntity)
    private readonly shopTransactionRepository: Repository<ShopTransactionEntity>,
  ) {}

  async getTopEarningShops(): Promise<LeaderboardItemDTO[]> {
    // Look through the shop_transaction table and sum the total amount spent by each shop
    const topSpendingCustomers = await this.shopTransactionRepository
      .createQueryBuilder('shop_transaction')
      .select('shop.id as id')
      .addSelect('shop.name')
      .addSelect('media.address as avatarUrl')
      .addSelect('SUM(shop_transaction.amount) as totalAmount')
      .addSelect('COUNT(shop_transaction.id) as totalTransactions')
      .innerJoin('shop_transaction.shop', 'shop')
      .innerJoin('shop.media', 'media')
      .groupBy('shop.id')
      .orderBy('totalAmount', 'DESC')
      .limit(10)
      .getRawMany();
    return topSpendingCustomers;
  }
}
