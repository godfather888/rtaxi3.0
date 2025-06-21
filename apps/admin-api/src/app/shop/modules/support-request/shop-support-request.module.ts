import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ShopSupportRequestActivityEntity } from '@ridy/database';
import { ShopSupportRequestEntity } from '@ridy/database';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { ShopSupportRequestDTO } from './dto/shop-support-request.dto';
import { ShopSupportRequestActivityDTO } from './dto/shop-support-request-activity.dto';
import { ShopSupportRequestService } from './shop-support-request.service';
import { ShopSupportRequestResolver } from './shop-support-request.resolver';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ShopSupportRequestEntity,
          ShopSupportRequestActivityEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: ShopSupportRequestEntity,
          DTOClass: ShopSupportRequestDTO,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          enableAggregate: true,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: ShopSupportRequestActivityEntity,
          DTOClass: ShopSupportRequestActivityDTO,
          pagingStrategy: PagingStrategies.NONE,
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
  providers: [ShopSupportRequestService, ShopSupportRequestResolver],
})
export class ShopSupportRequestModule {}
