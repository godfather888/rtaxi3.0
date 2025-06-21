import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FleetStaffSessionEntity } from '@ridy/database';
import { Repository } from 'typeorm';

@Injectable()
export class FleetService {
  constructor(
    @InjectRepository(FleetStaffSessionEntity)
    private readonly fleetStaffSessionRepository: Repository<FleetStaffSessionEntity>,
  ) {}

  async terminateFleetStaffSession(input: { id: number }) {
    const session = await this.fleetStaffSessionRepository.findOneBy({
      id: input.id,
    });
    if (session == null) {
      throw new Error('Session not found');
    }
    await this.fleetStaffSessionRepository.delete(session.id);
    return session;
  }
}
