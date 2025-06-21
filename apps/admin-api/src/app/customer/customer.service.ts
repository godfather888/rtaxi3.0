import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CustomerSessionEntity } from '@ridy/database';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerSessionEntity)
    private readonly customerSessionRepository: Repository<CustomerSessionEntity>,
  ) {}

  async terminateLoginSession(sessionId: string): Promise<DeleteResult> {
    return this.customerSessionRepository.softDelete(sessionId);
  }
}
