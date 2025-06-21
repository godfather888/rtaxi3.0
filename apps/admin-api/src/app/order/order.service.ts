import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from '@ridy/database';
import { RequestActivityType } from '@ridy/database';
import { RequestActivityEntity } from '@ridy/database';
import { TaxiOrderEntity } from '@ridy/database';
import { OrderRedisService } from '@ridy/database';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Between, Repository } from 'typeorm';
import { TaxiOrderNoteDTO } from './dto/taxi-order-note.dto';
import { TaxiOrderNoteEntity } from '@ridy/database';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(TaxiOrderEntity)
    private orderRepository: Repository<TaxiOrderEntity>,
    @InjectRepository(RequestActivityEntity)
    private activityRepository: Repository<RequestActivityEntity>,
    @InjectRepository(TaxiOrderNoteEntity)
    private orderNoteRepository: Repository<TaxiOrderNoteEntity>,
    private orderRedisService: OrderRedisService,
    @InjectPubSub()
    private pubSub: RedisPubSub,
  ) {}

  async cancelOrder(orderId: number): Promise<TaxiOrderEntity> {
    const order = await this.orderRepository.findOneOrFail({
      where: { id: orderId },
      relations: { service: true },
    });
    this.activityRepository.insert({
      requestId: order.id,
      type: RequestActivityType.CanceledByOperator,
    });
    await this.orderRepository.update(order.id, {
      status: OrderStatus.Expired,
      finishTimestamp: new Date(),
      costAfterCoupon: 0,
    });
    this.orderRedisService.expire([order.id]);
    this.pubSub.publish('orderRemoved', { orderRemoved: order });
    return order;
  }

  createTaxiOrderNote(input: {
    staffId: number;
    orderId: number;
    note: string;
  }): Promise<TaxiOrderNoteDTO> {
    this.orderNoteRepository.insert({
      orderId: input.orderId,
      note: input.note,
      staffId: input.staffId,
    });
    return this.orderNoteRepository.findOneOrFail({
      where: { orderId: input.orderId },
      relations: { staff: true },
    });
  }

  async getTaxiOrderSuccessRate(input: {
    startTime?: Date;
    endTime?: Date;
  }): Promise<number | null> {
    const countSuccess = await this.orderRepository.count({
      where: {
        expectedTimestamp:
          input.startTime || input.endTime == null
            ? null
            : Between(input.startTime, input.endTime),
        status: OrderStatus.Finished,
      },
    });
    const countAllOrders = await this.orderRepository.count({
      where: {
        expectedTimestamp:
          input.startTime || input.endTime == null
            ? undefined
            : Between(input.startTime, input.endTime),
      },
    });
    if (countAllOrders == 0) return null;
    return countSuccess / countAllOrders;
  }
}
