import { Module } from '@nestjs/common';
import { AnnouncementResolver } from './announcement.resolver';
import { AnnouncementService } from './announcement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementEntity } from '@ridy/database';

@Module({
  imports: [TypeOrmModule.forFeature([AnnouncementEntity])],
  providers: [AnnouncementResolver, AnnouncementService],
})
export class AnnouncementsModule {}
