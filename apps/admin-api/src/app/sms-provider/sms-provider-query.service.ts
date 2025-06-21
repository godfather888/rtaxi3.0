import { InjectRepository } from '@nestjs/typeorm';
import { QueryService } from '@ptc-org/nestjs-query-core';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { SMSProviderEntity } from '@ridy/database';
import { Not, Repository } from 'typeorm';
import { SMSProviderInput } from './dto/sms-provider.input';

@QueryService(SMSProviderEntity)
export class SMSProviderQueryService extends TypeOrmQueryService<SMSProviderEntity> {
  constructor(
    @InjectRepository(SMSProviderEntity)
    public override repo: Repository<SMSProviderEntity>,
  ) {
    super(repo);
  }

  override async createOne(
    record: SMSProviderInput,
  ): Promise<SMSProviderEntity> {
    const count = await this.repo.count();
    if (count === 0) {
      record.isDefault = true;
    }
    if (record.isDefault) {
      await this.repo.update(
        {
          id: Not(0), // Assuming the first record is the default one
        },
        { isDefault: false },
      );
    }
    return super.createOne(record);
  }
}
