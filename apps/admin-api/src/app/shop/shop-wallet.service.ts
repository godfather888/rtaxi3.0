import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopTransactionEntity } from '@ridy/database';
import { ShopWalletEntity } from '@ridy/database';
import { Repository } from 'typeorm';

@Injectable()
export class ShopWalletService {
  constructor(
    @InjectRepository(ShopWalletEntity)
    private readonly shopWalletRepository: Repository<ShopWalletEntity>,
    @InjectRepository(ShopTransactionEntity)
    private readonly shopTransactionEntity: Repository<ShopTransactionEntity>,
  ) {}

  async getShopWalletsByShopId(shopId: number): Promise<ShopWalletEntity[]> {
    return this.shopWalletRepository.find({
      where: {
        shopId,
      },
    });
  }

  async getShopWalletByShopIdAndCurrency(
    shopId: number,
    currency: string,
  ): Promise<ShopWalletEntity> {
    return this.shopWalletRepository.findOne({
      where: {
        shopId,
        currency,
      },
    });
  }

  async recordTransaction(
    transaction: Partial<ShopTransactionEntity>,
  ): Promise<ShopTransactionEntity> {
    await this.shopWalletRepository.increment(
      {
        shopId: transaction.shopId,
        currency: transaction.currency,
      },
      'balance',
      transaction.amount,
    );
    return this.shopTransactionEntity.save(transaction);
  }
}
