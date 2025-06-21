import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingLoginSessionEntity } from '@ridy/database';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingLoginSessionService {
  constructor(
    @InjectRepository(ParkingLoginSessionEntity)
    private parkingLoginSessionRepository: Repository<ParkingLoginSessionEntity>,
  ) {}

  async terminateParkingLoginSession(id: string) {
    return this.parkingLoginSessionRepository.delete(id);
  }
}
