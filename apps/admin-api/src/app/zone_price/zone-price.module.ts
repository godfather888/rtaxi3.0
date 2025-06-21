import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ZonePriceCategoryEntity } from '@ridy/database';
import { ZonePriceEntity } from '@ridy/database';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ZonePriceInput } from './dto/zone-price.input';
import { ZonePriceDTO } from './dto/zone-price.dto';
import { ZonePriceCategoryDTO } from './dto/zone-price-category.dto';
import { ZonePriceCategoryInput } from './dto/zone-price-category.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ZonePriceEntity,
          ZonePriceCategoryEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: ZonePriceEntity,
          DTOClass: ZonePriceDTO,
          CreateDTOClass: ZonePriceInput,
          UpdateDTOClass: ZonePriceInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: ZonePriceCategoryEntity,
          DTOClass: ZonePriceCategoryDTO,
          CreateDTOClass: ZonePriceCategoryInput,
          UpdateDTOClass: ZonePriceCategoryInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.NONE,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
})
export class ZonePriceModule {}
