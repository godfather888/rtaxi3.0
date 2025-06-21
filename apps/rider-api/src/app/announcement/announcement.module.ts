import { Module } from '@nestjs/common';

import { AnnouncementService } from './announcement.service';
import { AnnouncementResolver } from './announcement.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementEntity } from '@ridy/database';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnnouncementEntity]),
    // NestjsQueryGraphQLModule.forFeature({
    //   imports: [NestjsQueryTypeOrmModule.forFeature([AnnouncementEntity])],
    //   resolvers: [
    //     {
    //       EntityClass: AnnouncementEntity,
    //       DTOClass: AnnouncementDTO,
    //       read: { disabled: true },
    //       create: { disabled: true },
    //       delete: { disabled: true },
    //       update: { disabled: true },
    //     },
    //   ],
    // }),
  ],
  providers: [AnnouncementService, AnnouncementResolver],
})
export class AnnouncementModule {}
