import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { RegionEntity } from '@ridy/database';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RegionDTO } from './dto/region.dto';
import { CreateRegionInput } from './dto/create-region.input';
import { RegionCategoryEntity } from '@ridy/database';
import { RegionCategoryDTO } from './dto/region-category.dto';
import { RegionCategoryInput } from './dto/region-category.input';
import { UpdateRegionInput } from './dto/update-region.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          RegionEntity,
          RegionCategoryEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: RegionEntity,
          DTOClass: RegionDTO,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          CreateDTOClass: CreateRegionInput,
          UpdateDTOClass: UpdateRegionInput,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: RegionCategoryEntity,
          DTOClass: RegionCategoryDTO,
          CreateDTOClass: RegionCategoryInput,
          UpdateDTOClass: RegionCategoryInput,
          pagingStrategy: PagingStrategies.NONE,
          enableTotalCount: true,
          enableAggregate: true,
          guards: [JwtAuthGuard],
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
        },
      ],
    }),
  ],
})
export class RegionModule {}
