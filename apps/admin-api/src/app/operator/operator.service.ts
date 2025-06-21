import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OperatorPermission } from '@ridy/database';
import { OperatorEntity } from '@ridy/database';
import { ForbiddenError } from '@nestjs/apollo';
import { DeleteResult, Repository } from 'typeorm';
import { OperatorSessionEntity } from '@ridy/database';
import { UpdateProfileInput } from './input/update-profile.input';

@Injectable()
export class OperatorService {
  constructor(
    @InjectRepository(OperatorEntity)
    public repo: Repository<OperatorEntity>,
    @InjectRepository(OperatorSessionEntity)
    public sessionRepo: Repository<OperatorSessionEntity>,
  ) {}

  async validateCredentials(
    userName: string,
    password: string,
  ): Promise<OperatorEntity | null> {
    return this.repo.findOneBy({ userName, password });
  }

  terminateSession(id: string): Promise<DeleteResult> {
    return this.sessionRepo.delete(id);
  }

  async getById(id: number): Promise<OperatorEntity | null> {
    return this.repo.findOneBy({ id });
  }

  async hasPermission(
    id: number,
    permission: OperatorPermission,
  ): Promise<OperatorEntity> {
    const operator = await this.repo.findOneOrFail({
      where: { id },
      relations: { role: true },
    });
    const hasPermission = operator.role.permissions.includes(permission);
    if (!hasPermission) throw new ForbiddenError('PERMISSION_NOT_GRANTED');
    return operator;
  }

  async hasPermissionBoolean(
    id: number,
    permission: OperatorPermission,
  ): Promise<boolean> {
    const operator = await this.repo.findOneOrFail({
      where: { id },
      relations: { role: true },
    });
    return operator.role.permissions.includes(permission);
  }

  async updateProfile(input: {
    id: number;
    update: UpdateProfileInput;
  }): Promise<OperatorEntity> {
    const user = await this.getById(input.id);
    if (!user) throw new ForbiddenError('USER_NOT_FOUND');
    // check if the new username is already taken
    if (input.update.userName) {
      const userWithSameUserName = await this.repo.findOneBy({
        userName: input.update.userName,
      });
      if (userWithSameUserName && userWithSameUserName.id !== user.id) {
        throw new ForbiddenError('USERNAME_ALREADY_TAKEN');
      }
    }
    await this.repo.update(user.id, input.update);
    return this.getById(user.id);
  }

  async currentUserSessions(staffId: number): Promise<OperatorSessionEntity[]> {
    return this.sessionRepo.find({
      where: {
        operatorId: staffId,
      },
    });
  }
}
