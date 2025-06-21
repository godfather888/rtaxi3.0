import { Injectable } from '@nestjs/common';
import { LeaderboardItemDTO } from '../../core/dto/leaderboard-item.dto';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { DriverTransactionEntity } from '@ridy/database';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ActiveInactiveUsersDTO,
  UserActivityLevel,
} from '../../core/dto/active-inactive-users.dto';
import { DriverEntity } from '@ridy/database';

@Injectable()
export class DriversInsightsService {
  constructor(
    @InjectRepository(DriverEntity)
    private readonly driverRepository: Repository<DriverEntity>,
    @InjectRepository(DriverTransactionEntity)
    private readonly driverTransactionRepository: Repository<DriverTransactionEntity>,
  ) {}

  async getTopEarningDrivers(input: {
    currency: string;
  }): Promise<LeaderboardItemDTO[]> {
    // Look through the driver_transaction table and sum the total amount spent by each driver
    const topSpendingCustomers = await this.driverTransactionRepository
      .createQueryBuilder('driver_transaction')
      .select('driver.id as id')
      .addSelect('driver.firstName as firstName')
      .addSelect('driver.lastName as lastName')
      .addSelect('media.address as avatarUrl')
      .addSelect('SUM(driver_transaction.amount) as totalAmount')
      .addSelect('ANY_VALUE(driver_transaction.currency) as currency')
      .innerJoin('driver_transaction.driver', 'driver')
      .innerJoin('driver.media', 'media')
      .where('driver_transaction.currency = :currency', {
        currency: input.currency,
      })
      .groupBy('driver.id')
      .orderBy('totalAmount', 'DESC')
      .limit(10)
      .getRawMany();
    // join firstName and lastName to create a name field
    topSpendingCustomers.forEach((driver) => {
      driver.name = `${driver.firstName} ${driver.lastName}`;
    });
    return topSpendingCustomers;
  }

  topTripsCompletedDrivers(): Promise<LeaderboardItemDTO[]> {
    // Look through the driver_transaction table and sum the total number of trips completed by each driver
    return this.driverTransactionRepository
      .createQueryBuilder('driver_transaction')
      .select('driver.id as id')
      .addSelect('driver.firstName as firstName')
      .addSelect('driver.lastName as lastName')
      .addSelect('media.address as avatarUrl')
      .addSelect('COUNT(driver_transaction.id) as totalCount')
      .innerJoin('driver_transaction.driver', 'driver')
      .innerJoin('driver.media', 'media')
      .groupBy('driver.id')
      .orderBy('totalTransactions', 'DESC')
      .limit(10)
      .getRawMany();
  }

  async getActiveInactiveDrivers(): Promise<ActiveInactiveUsersDTO[]> {
    const thirteendDaysAgo: Date = new Date(
      new Date().getTime() - 30 * 24 * 60 * 60 * 1000,
    );
    const activeUsers = await this.driverRepository.count({
      where: {
        lastSeenTimestamp: MoreThan(
          thirteendDaysAgo, // 30 days
        ),
      },
    });
    const inactiveUsers = await this.driverRepository.count({
      where: {
        lastSeenTimestamp: LessThan(
          thirteendDaysAgo, // 30 days
        ),
      },
    });
    return [
      {
        count: activeUsers,
        date: new Date(),
        activityLevel: UserActivityLevel.Active,
      },
      {
        count: inactiveUsers,
        date: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        activityLevel: UserActivityLevel.Inactive,
      },
    ];
  }
}
