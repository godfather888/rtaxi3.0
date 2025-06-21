import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { ShopFeedbackEntity } from '@ridy/database';
import { ShopFeedbackDTO } from './dto/shop-feedback.dto';
import { ShopFeedbackParameterEntity } from '@ridy/database';
import { ShopFeedbackParameterDTO } from './dto/shop-feedback-parameter.dto';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ShopFeedbackService } from './shop-feedback.service';
import { ShopFeedbackResolver } from './shop-feedback.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from '@ridy/database';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShopEntity,
      ShopFeedbackEntity,
      ShopFeedbackParameterEntity,
    ]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ShopFeedbackEntity,
          ShopFeedbackParameterEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: ShopFeedbackEntity,
          DTOClass: ShopFeedbackDTO,
          guards: [JwtAuthGuard],
          enableTotalCount: true,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          read: { one: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
        },
        {
          EntityClass: ShopFeedbackParameterEntity,
          DTOClass: ShopFeedbackParameterDTO,
          guards: [JwtAuthGuard],
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
        },
      ],
    }),
  ],
  providers: [ShopFeedbackService, ShopFeedbackResolver],
})
export class ShopFeedbackModule {}
