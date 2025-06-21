import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { RedisPubSubProvider } from '@ridy/database';
import { OrderMessageEntity } from '@ridy/database';
import { TaxiOrderEntity } from '@ridy/database';
import { GqlAuthGuard } from '../auth/access-token.guard';
import { FirebaseNotificationModule } from '@ridy/database';

import { OrderModule } from '../order/order.module';
import { ChatService } from './chat.service';
import { ChatSubscriptionService } from './chat.subscription.service';
import { OrderMessageDTO } from './dto/order-message.dto';
import { OrderMessageInput } from './dto/order-message.input';
import { DriverNotificationService } from '@ridy/database';
import { ChatResolver } from './chat.resolver';

@Module({
  imports: [
    OrderModule,
    FirebaseNotificationModule.register(),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          OrderMessageEntity,
          TaxiOrderEntity,
        ]),
      ],
      services: [ChatService, DriverNotificationService],
      pubSub: RedisPubSubProvider.provider(),
      resolvers: [
        {
          EntityClass: OrderMessageEntity,
          DTOClass: OrderMessageDTO,
          CreateDTOClass: OrderMessageInput,
          ServiceClass: ChatService,
          pagingStrategy: PagingStrategies.NONE,
          create: { many: { disabled: true } },
          read: { one: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
      ],
    }),
  ],
  providers: [
    ChatSubscriptionService,
    ChatResolver,
    RedisPubSubProvider.provider(),
  ],
})
export class ChatModule {}
