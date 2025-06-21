import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { CarColorEntity } from '@ridy/database';
import { CarModelEntity } from '@ridy/database';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CarColorDTO } from './dto/car-color.dto';
import { CarModelDTO } from './dto/car-model.dto';
import { CarColorInput } from './dto/car-color.input';
import { CarModelInput } from './dto/car-model.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([CarColorEntity, CarModelEntity]),
      ],
      resolvers: [
        {
          EntityClass: CarModelEntity,
          DTOClass: CarModelDTO,
          CreateDTOClass: CarModelInput,
          UpdateDTOClass: CarModelInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: CarColorEntity,
          DTOClass: CarColorDTO,
          CreateDTOClass: CarColorInput,
          UpdateDTOClass: CarColorInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
})
export class CarModule {}
