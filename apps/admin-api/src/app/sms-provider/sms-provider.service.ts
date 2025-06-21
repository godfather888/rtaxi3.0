import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SMSProviderEntity } from '@ridy/database';
import { Repository } from 'typeorm';

@Injectable()
export class SMSProviderService {
  constructor(
    @InjectRepository(SMSProviderEntity)
    private readonly smsProviderRepository: Repository<SMSProviderEntity>,
  ) {}

  async markAsDefault(id: number): Promise<SMSProviderEntity> {
    await this.smsProviderRepository.update({}, { isDefault: false });
    await this.smsProviderRepository.update({ id }, { isDefault: true });
    const provider = await this.smsProviderRepository.findOneBy({ id });
    return provider;
  }
}
