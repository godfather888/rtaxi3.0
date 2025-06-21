import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisPubSubProvider } from '@ridy/database';
import { RequestActivityEntity } from '@ridy/database';
import { OrderMessageEntity } from '@ridy/database';
import { TaxiOrderEntity } from '@ridy/database';
import { SharedOrderModule } from '@ridy/database';
import { RedisHelpersModule } from '@ridy/database';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DispatcherResolver } from './dispatcher.resolver';
import { OrderMessageDTO } from './dto/order-message.dto';
import { OrderDTO } from './dto/order.dto';
import { OrderSubscriptionService } from './order-subscription.service';
import { OrderService } from './order.service';
import { OrderCancelReasonEntity } from '@ridy/database';
import { OrderCancelReasonDTO } from './dto/order-cancel-reason.dto';
import { OrderCancelReasonInput } from './dto/order-cancel-reason.input';
import { TaxiOrderNoteEntity } from '@ridy/database';
import { OrderResolver } from './order.resolver';
import { TaxiOrderNoteDTO } from './dto/taxi-order-note.dto';

@Module({
  imports: [
    SharedOrderModule,
    RedisHelpersModule,
    TypeOrmModule.forFeature([RequestActivityEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          TaxiOrderEntity,
          OrderMessageEntity,
          OrderCancelReasonEntity,
          TaxiOrderNoteEntity,
        ]),
      ],
      pubSub: RedisPubSubProvider.provider(),
      resolvers: [
        {
          EntityClass: TaxiOrderEntity,
          DTOClass: OrderDTO,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          guards: [JwtAuthGuard],
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
        },
        {
          EntityClass: OrderMessageEntity,
          DTOClass: OrderMessageDTO,
          pagingStrategy: PagingStrategies.OFFSET,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: OrderCancelReasonEntity,
          DTOClass: OrderCancelReasonDTO,
          CreateDTOClass: OrderCancelReasonInput,
          UpdateDTOClass: OrderCancelReasonInput,
          guards: [JwtAuthGuard],
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
        {
          EntityClass: TaxiOrderNoteEntity,
          DTOClass: TaxiOrderNoteDTO,
          guards: [JwtAuthGuard],
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { one: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
        },
      ],
    }),
  ],
  providers: [
    DispatcherResolver,
    OrderResolver,
    OrderSubscriptionService,
    OrderService,
    RedisPubSubProvider.provider(),
  ],
})
export class OrderModule {}
