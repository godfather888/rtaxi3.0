import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { GiftBatchDTO } from './dto/gift-batch.dto';
import { GiftCodeDTO } from './dto/gift-code.dto';
import { GiftBatchEntity } from '@ridy/database';
import { GiftCodeEntity } from '@ridy/database';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GiftCardService } from './gift-card.service';
import { GiftCardResolver } from './gift-card.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatorModule } from '../operator/operator.module';

@Module({
  imports: [
    OperatorModule,
    TypeOrmModule.forFeature([GiftBatchEntity, GiftCodeEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([GiftBatchEntity, GiftCodeEntity]),
      ],
      resolvers: [
        {
          EntityClass: GiftBatchEntity,
          DTOClass: GiftBatchDTO,
          update: { disabled: true },
          delete: { disabled: true },
          create: { disabled: true },
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
        {
          EntityClass: GiftCodeEntity,
          DTOClass: GiftCodeDTO,
          update: { disabled: true },
          delete: { disabled: true },
          create: { disabled: true },
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          read: { one: { disabled: true } },
        },
      ],
    }),
  ],
  providers: [GiftCardService, GiftCardResolver],
})
export class GiftCardModule {}
