import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { VerifyHash } from '../sms/auth-redis.service';

@Injectable()
export class SharedCustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    public customerRepository: Repository<CustomerEntity>,
  ) {}

  async findById(id: number): Promise<CustomerEntity> {
    return this.customerRepository.findOneOrFail({
      where: { id },
      withDeleted: true,
    });
  }

  async findWithDeleted(
    filter: FindOptionsWhere<CustomerEntity>,
  ): Promise<CustomerEntity | null> {
    return this.customerRepository.findOne({
      where: filter,
      withDeleted: true,
    });
  }

  private async findUserByMobileNumber(
    mobileNumber: string,
  ): Promise<CustomerEntity | null> {
    return this.customerRepository.findOne({
      where: { mobileNumber },
      withDeleted: true,
    });
  }

  private async createUserWithMobileNumber(
    input: Omit<VerifyHash, 'code'>,
  ): Promise<CustomerEntity> {
    Logger.log('creating rider with ');
    const rider = this.customerRepository.create({
      mobileNumber: input.mobileNumber,
      countryIso: input.countryIso,
    });
    const CustomerEntity = await this.customerRepository.save(rider);
    return CustomerEntity;
  }

  updateLastActivity(riderId: number) {
    return this.customerRepository.update(riderId, {
      lastActivityAt: new Date(),
    });
  }

  async findOrCreateUserWithMobileNumber(input: {
    mobileNumber: string;
    countryIso?: string;
  }): Promise<CustomerEntity> {
    // Используем транзакцию для предотвращения race condition
    return await this.customerRepository.manager.transaction(async (manager) => {
      let user = await manager.findOne(CustomerEntity, {
        where: { mobileNumber: input.mobileNumber },
        withDeleted: true,
        lock: { mode: 'pessimistic_write' },
      });
      if (!user) {
        user = manager.create(CustomerEntity, {
          mobileNumber: input.mobileNumber,
          countryIso: input.countryIso,
        });
        await manager.save(user);
    }
      if (user.deletedAt != null) {
        await manager.restore(CustomerEntity, {
          id: user.id,
        });
        // Перезагружаем пользователя после восстановления
        user = await manager.findOne(CustomerEntity, {
          where: { id: user.id },
        }) as CustomerEntity;
      }
      return user;
    });
  }

  async deleteById(id: number): Promise<CustomerEntity> {
    const user = await this.findById(id);
    await this.customerRepository.softDelete(id);
    return user;
  }
}
