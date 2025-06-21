import { Injectable } from '@nestjs/common';
import { DriverEntity } from '@ridy/database';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverStatus } from '@ridy/database';
import { DriverRedisService } from '@ridy/database';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(DriverEntity) private repo: Repository<DriverEntity>,
    private driverRedisService: DriverRedisService,
  ) {}

  async findWithDeleted(
    input: FindOptionsWhere<DriverEntity>,
  ): Promise<DriverEntity | null> {
    return this.repo.findOne({ where: input, withDeleted: true });
  }

  async findOrCreateUserWithMobileNumber(input: {
    mobileNumber: string;
    countryIso?: string;
  }): Promise<DriverEntity> {
    const findResult = await this.findWithDeleted({
      mobileNumber: input.mobileNumber,
    });
    if (findResult?.deletedAt != null) {
      await this.repo.restore(findResult.id);
    }
    if (findResult == null) {
      const driver = this.repo.create(input);
      return this.repo.save(driver);
    }
    const user = this.repo.findOne({
      where: { mobileNumber: input.mobileNumber },
      withDeleted: true,
      relations: {
        documents: true,
        media: true,
      },
    });
    return user;
  }

  async findByIds(ids: number[]): Promise<DriverEntity[]> {
    return this.repo.find({ where: { id: In(ids) }, withDeleted: true });
  }

  async setPassword(input: {
    driverId: number;
    password: string;
  }): Promise<DriverEntity> {
    await this.repo.update(input.driverId, {
      password: input.password,
    });
    return this.repo.findOneBy({ id: input.driverId });
  }

  async expireDriverStatus(driverIds: number[]) {
    if (driverIds.length < 1) {
      return;
    }
    this.driverRedisService.expire(driverIds);
    return this.repo.update(driverIds, {
      status: DriverStatus.Offline,
      lastSeenTimestamp: new Date(),
    });
  }

  restore(id: number) {
    return this.repo.restore(id);
  }
}
