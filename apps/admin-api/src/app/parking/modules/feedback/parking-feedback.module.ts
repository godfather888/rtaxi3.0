import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { ParkingFeedbackEntity } from '@ridy/database';
import { ParkingFeedbackDTO } from './dto/parking-feedback.dto';
import { ParkingFeedbackParameterEntity } from '@ridy/database';
import { ParkingFeedbackParameterDTO } from './dto/parking-feedback-parameter.dto';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ParkingFeedbackService } from './parking-feedback.service';
import { ParkingFeedbackResolver } from './parking-feedback.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkSpotEntity } from '@ridy/database';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ParkSpotEntity,
      ParkingFeedbackEntity,
      ParkingFeedbackParameterEntity,
    ]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ParkingFeedbackEntity,
          ParkingFeedbackParameterEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: ParkingFeedbackEntity,
          DTOClass: ParkingFeedbackDTO,
          guards: [JwtAuthGuard],
          enableTotalCount: true,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          read: { one: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableAggregate: true,
        },
        {
          EntityClass: ParkingFeedbackParameterEntity,
          DTOClass: ParkingFeedbackParameterDTO,
          guards: [JwtAuthGuard],
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.NONE,
          enableTotalCount: true,
        },
      ],
    }),
  ],
  providers: [ParkingFeedbackService, ParkingFeedbackResolver],
})
export class ParkingFeedbackModule {}
