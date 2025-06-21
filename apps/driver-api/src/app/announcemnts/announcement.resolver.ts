import { Resolver, Query } from '@nestjs/graphql';
import { AnnouncementDTO } from './dto/announcement.dto';
import { AnnouncementService } from './announcement.service';

@Resolver()
export class AnnouncementResolver {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Query(() => [AnnouncementDTO])
  async announcements(): Promise<AnnouncementDTO[]> {
    return this.announcementService.getAnnouncements();
  }
}
