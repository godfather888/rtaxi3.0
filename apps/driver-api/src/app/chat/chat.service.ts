import { QueryService } from '@ptc-org/nestjs-query-core';
import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderMessageEntity } from '@ridy/database';
import { TaxiOrderEntity } from '@ridy/database';
import { RiderNotificationService } from '@ridy/database';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Repository } from 'typeorm';

import { OrderMessageDTO } from './dto/order-message.dto';
import { OrderMessageInput } from './dto/order-message.input';

@QueryService(OrderMessageEntity)
export class ChatService extends TypeOrmQueryService<OrderMessageEntity> {
  constructor(
    @InjectRepository(OrderMessageEntity)
    public repository: Repository<OrderMessageEntity>,
    @InjectRepository(TaxiOrderEntity)
    private requestRepository: Repository<TaxiOrderEntity>,
    @InjectPubSub()
    private pubSub: RedisPubSub,
    private riderNotificationService: RiderNotificationService,
  ) {
    super(repository);
  }

  override async createOne(input: OrderMessageInput) {
    let message = await super.createOne({ ...input, sentByDriver: true });
    const order = await this.requestRepository.findOneOrFail({
      where: { id: message.requestId },
      relations: {
        rider: true,
        driver: true,
      },
    });
    message = await this.getById(message.id);
    this.riderNotificationService.message(order.rider, message);
    this.pubSub.publish<{
      newMessageReceived: OrderMessageDTO;
      riderId: number;
    }>('newMessageForRider', {
      newMessageReceived: message,
      riderId: order.riderId,
    });
    return message;
  }

  async updateLastSeenMessagesAt(orderId: number): Promise<boolean> {
    await this.requestRepository.update(orderId, {
      driverLastSeenMessagesAt: new Date(),
    });
    return true;
  }
}
