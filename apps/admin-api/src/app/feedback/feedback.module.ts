import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { FeedbackParameterEntity } from '@ridy/database';
import { FeedbackEntity } from '@ridy/database';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FeedbackParameterDTO } from './dto/feedback-parameter.dto';
import { FeedbackDTO } from './dto/feedback.dto';
import { FeedbackParameterInput } from './dto/feedback-parameter.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          FeedbackEntity,
          FeedbackParameterEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: FeedbackEntity,
          DTOClass: FeedbackDTO,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: FeedbackParameterEntity,
          DTOClass: FeedbackParameterDTO,
          CreateDTOClass: FeedbackParameterInput,
          UpdateDTOClass: FeedbackParameterInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.NONE,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
})
export class FeedbackModule {}
