import { DeepPartial, QueryService } from '@ptc-org/nestjs-query-core';
import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxiSupportRequestEntity } from '@ridy/database';
import { OperatorEntity } from '@ridy/database';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Repository } from 'typeorm';
import { ComplaintDTO } from './dto/complaint.dto';
import { EnabledNotification } from '@ridy/database';

@QueryService(ComplaintDTO)
export class ComplaintQueryService extends TypeOrmQueryService<ComplaintDTO> {
  constructor(
    @InjectRepository(TaxiSupportRequestEntity)
    repo: Repository<TaxiSupportRequestEntity>,
    @InjectRepository(OperatorEntity)
    private operatorRepo: Repository<OperatorEntity>,
    @InjectPubSub()
    private pubSub: RedisPubSub,
  ) {
    super(repo);
  }

  override async createOne(
    record: DeepPartial<ComplaintDTO>,
  ): Promise<ComplaintDTO> {
    const dto = await super.createOne(record);
    const savedRecord = await this.repo.findOneOrFail({
      where: { id: dto.id },
      relations: ['request', 'activities'],
    });
    const admins = await this.operatorRepo.find({
      where: { enabledNotifications: EnabledNotification.SupportRequest },
    });
    this.pubSub.publish('complaintCreated', {
      complaintCreated: savedRecord,
      adminIds: admins.map((admin) => admin.id),
    });
    return savedRecord;
  }
}
