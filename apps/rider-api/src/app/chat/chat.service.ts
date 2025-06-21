import { QueryService } from '@ptc-org/nestjs-query-core';
import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderMessageEntity } from '@ridy/database';
import { TaxiOrderEntity } from '@ridy/database';
import { DriverNotificationService } from '@ridy/database';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Repository } from 'typeorm';

import { OrderMessageDTO } from './dto/order-message.dto';
import { OrderMessageInput } from './dto/order-message.input';
import { Logger } from '@nestjs/common';

@QueryService(OrderMessageEntity)
export class ChatService extends TypeOrmQueryService<OrderMessageEntity> {
  constructor(
    @InjectRepository(OrderMessageEntity)
    public repository: Repository<OrderMessageEntity>,
    @InjectRepository(TaxiOrderEntity)
    private requestRepository: Repository<TaxiOrderEntity>,
    @InjectPubSub()
    private pubSub: RedisPubSub,
    private driverNotificationService: DriverNotificationService,
  ) {
    super(repository);
  }

  override async createOne(input: OrderMessageInput) {
    let message = await super.createOne({ ...input, sentByDriver: false });
    const order = await this.requestRepository.findOne({
      where: { id: message.requestId },
      relations: {
        rider: true,
        driver: true,
      },
    });
    message = await this.getById(message.id);
    this.driverNotificationService.message(order!.driver!, message);
    Logger.log('newMessageForDriverPublished', JSON.stringify(message));
    this.pubSub.publish<{
      newMessageReceived: OrderMessageDTO;
      driverId: number;
    }>('newMessageForDriver', {
      newMessageReceived: message,
      driverId: order!.driverId!,
    });
    return message;
  }

  async updateLastSeenMessagesAt(orderId: number): Promise<boolean> {
    await this.requestRepository.update(orderId, {
      riderLastSeenMessagesAt: new Date(),
    });
    return true;
  }
}
