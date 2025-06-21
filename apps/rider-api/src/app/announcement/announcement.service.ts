import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnouncementEntity } from '@ridy/database';
import { AnnouncementUserType } from '@ridy/database';
import { Repository } from 'typeorm';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(AnnouncementEntity)
    private readonly announcementRepository: Repository<AnnouncementEntity>,
  ) {}

  // Define your service methods here
  async getAnnouncements(): Promise<AnnouncementEntity[]> {
    return this.announcementRepository
      .createQueryBuilder('announcement')
      .where('announcement.startAt <= :currentDate', {
        currentDate: new Date(),
      })
      .andWhere('announcement.expireAt >= :currentDate', {
        currentDate: new Date(),
      })
      .andWhere('FIND_IN_SET(announcement.userType, :userTypes)', {
        userTypes: [AnnouncementUserType.Rider],
      })
      .getMany();
  }
}
