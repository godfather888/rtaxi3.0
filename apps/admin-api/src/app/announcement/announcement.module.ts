import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { AnnouncementEntity } from '@ridy/database';
import { AnnouncementDTO } from './dto/announcement.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AnnouncementInput } from './dto/announcement.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([AnnouncementEntity])],
      resolvers: [
        {
          EntityClass: AnnouncementEntity,
          DTOClass: AnnouncementDTO,
          CreateDTOClass: AnnouncementInput,
          UpdateDTOClass: AnnouncementInput,
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
export class AnnouncementModule {}
