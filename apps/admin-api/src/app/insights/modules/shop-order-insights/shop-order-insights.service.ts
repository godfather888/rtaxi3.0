import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopOrderEntity } from '@ridy/database';
import { Repository } from 'typeorm';

@Injectable()
export class ShopOrderInsightsService {
  constructor(
    @InjectRepository(ShopOrderEntity)
    private shopOrderRepository: Repository<ShopOrderEntity>,
  ) {}

  async shopAverageDeliveryTime(input: {
    shopId?: number;
    startDate?: Date;
    endDate?: Date;
  }): Promise<number> {
    const query = this.shopOrderRepository.createQueryBuilder('shop_order');
    // deduct fullfillmentTime from createdAt and convert to minutes
    query.select(
      'AVG(TIMESTAMPDIFF(MINUTE, shopOrder.fullfillmentTime, shopOrder.createdAt))',
      'averageDeliveryTime',
    );
    query.where('shopOrder.fullfillmentTime IS NOT NULL');
    if (input.shopId) {
      query.andWhere('shopOrder.shopId = :shopId', { shopId: input.shopId });
    }
    if (input.startDate) {
      query.andWhere('shopOrder.createdAt >= :startDate', {
        startDate: input.startDate,
      });
    }
    if (input.endDate) {
      query.andWhere('shopOrder.createdAt <= :endDate', {
        endDate: input.endDate,
      });
    }

    return query[0].averageDeliveryTime;
  }
}
