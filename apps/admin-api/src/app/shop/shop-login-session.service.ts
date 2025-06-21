import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopLoginSessionEntity } from '@ridy/database';
import { Repository } from 'typeorm';

@Injectable()
export class ShopLoginSessionService {
  constructor(
    @InjectRepository(ShopLoginSessionEntity)
    private shopLoginSessionRepository: Repository<ShopLoginSessionEntity>,
  ) {}

  async terminateLoginSession(id: string) {
    return this.shopLoginSessionRepository.delete(id);
  }
}
