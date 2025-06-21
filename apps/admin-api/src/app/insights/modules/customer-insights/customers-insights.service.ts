import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '@ridy/database';
import { CustomerSessionEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { CustomersPerAppDTO } from '../../core/dto/customers-per-app.dto';
import { ProviderTransactionEntity } from '@ridy/database';
import { RevenuePerApp } from '../../core/dto/revenue-per-app.input';
import { ChartFilterInput } from '../../core/dto/chart-filter.input';
import { PlatformDistributionDTO } from '../../core/dto/platform-distribution.dto';
import { LeaderboardItemDTO } from '../../core/dto/leaderboard-item.dto';
import { RiderTransactionEntity } from '@ridy/database';
import { GenderDistributionDTO } from '../../core/dto/gender-distribution.dto';
import { RetentionRateDTO } from '../../core/dto/retention-rate.dto';
import {
  ActiveInactiveUsersDTO,
  UserActivityLevel,
} from '../../core/dto/active-inactive-users.dto';
import { CountryDistributionDTO } from '../../core/dto/country-distribution.dto';
import { ChartInterval } from '@ridy/database';
import { AppType } from '@ridy/database';

@Injectable()
export class CustomersInsightsService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    @InjectRepository(CustomerSessionEntity)
    private readonly customerSessionRepository: Repository<CustomerSessionEntity>,
    @InjectRepository(ProviderTransactionEntity)
    private readonly providerTransactionRepository: Repository<ProviderTransactionEntity>,
    @InjectRepository(RiderTransactionEntity)
    private readonly riderTransactionRepository: Repository<RiderTransactionEntity>,
  ) {}

  async getCustomersPerApp(): Promise<CustomersPerAppDTO[]> {
    // Look through the customer session table and count the number of customers per app
    const customersPerApp = await this.customerSessionRepository
      .createQueryBuilder('session')
      .select('session.appType as app')
      .addSelect('COUNT(session.customerId) as count')
      .groupBy('session.appType')
      .getRawMany();
    // if appType not found set it to zero
    const appTypes = Object.values(AppType);
    appTypes.forEach((appType) => {
      if (!customersPerApp.find((customer) => customer.app === appType)) {
        customersPerApp.push({ app: appType, count: 0 });
      }
    });
    return customersPerApp;
  }

  async revenuePerApp(input: ChartFilterInput): Promise<RevenuePerApp[]> {
    // Look through the provider transaction table and sum the revenue per app
    const revenuePerApp = await this.providerTransactionRepository
      .createQueryBuilder('admin_transaction')
      .select('admin_transaction.appType as app')
      .addSelect('SUM(admin_transaction.amount) as revenue')
      .addSelect('ANY_VALUE(admin_transaction.createdAt) as date')
      .where('admin_transaction.createdAt >= :startDate', {
        startDate: input.startDate,
      })
      .andWhere('admin_transaction.createdAt <= :endDate', {
        endDate: input.endDate,
      })
      // Group by the Date based on the interval
      .groupBy(this.getGroupByDate(input.interval, 'date').groupBy)
      .addGroupBy('admin_transaction.appType')
      .getRawMany();
    return revenuePerApp;
  }

  async customerPlatformDistribution(): Promise<PlatformDistributionDTO[]> {
    // Look through the customer_sesson table and count the number of devices per platform
    const platformDistribution = await this.customerSessionRepository
      .createQueryBuilder('session')
      .select('session.devicePlatform as device')
      .addSelect('COUNT(session.id) as count')
      .groupBy('session.devicePlatform')
      .getRawMany();
    return platformDistribution;
  }

  async getTopSpendingCustomers(): Promise<LeaderboardItemDTO[]> {
    // Look through the rider_transaction table and sum the total amount spent by each customer
    const topSpendingCustomers = await this.riderTransactionRepository
      .createQueryBuilder('rider_transaction')
      .select('customer.id as id')
      .addSelect('customer.firstName as firstName')
      .addSelect('customer.lastName as lastName')
      .addSelect('media.address as avatarUrl')
      .addSelect('SUM(rider_transaction.amount) as totalAmount')
      .addSelect('COUNT(rider_transaction.id) as totalTransactions')
      .innerJoin('rider_transaction.rider', 'customer')
      .innerJoin('customer.media', 'media')
      .groupBy('customer.id')
      .orderBy('totalAmount', 'DESC')
      .limit(10)
      .getRawMany();
    // join firstName and lastName to create a name field
    topSpendingCustomers.forEach((customer) => {
      customer.name = `${customer.firstName} ${customer.lastName}`;
    });
    return topSpendingCustomers;
  }

  async genderDistribution(): Promise<GenderDistributionDTO[]> {
    // Look through the customer table and count the number of customers per gender
    const genderDistribution = await this.customerRepository
      .createQueryBuilder('customer')
      .select('customer.gender as gender')
      .addSelect('COUNT(customer.id) as count')
      .groupBy('customer.gender')
      .getRawMany();
    return genderDistribution;
  }

  async retentionRate(input: ChartFilterInput): Promise<RetentionRateDTO[]> {
    // look through the taxi_order, shop_order, and park_order tables and count the number of active customers
    const activeUsers = await this._activeUsers(input);
    // Look through the customer table and count the number of total customers per date
    const totalUsers = await this.customerRepository
      .createQueryBuilder('customer')
      .select('ANY_VALUE(customer.registrationTimestamp) as date')
      .addSelect('COUNT(DISTINCT customer.id) as totalCustomers')
      .groupBy(this.getGroupByDate(input.interval, 'date').groupBy)
      .getRawMany();
    // Calculate the retention rate
    const retentionRate: RetentionRateDTO[] = totalUsers.map((totalUser) => {
      const activeUser = activeUsers.find(
        (activeUser) => activeUser.date === totalUser.date,
      );
      return {
        date: totalUser.date,
        retentionRate: activeUser.activeCustomers / totalUser.totalCustomers,
      };
    });
    return retentionRate;
  }

  async activeInactiveUsers(
    input: ChartFilterInput,
  ): Promise<ActiveInactiveUsersDTO[]> {
    const activeUsers = await this._activeUsers(input);
    const inactiveUsers = await this._inactiveUsers(input);
    const activeInactiveUsers = activeUsers.map((activeUser) => {
      return {
        count: activeUser.activeCustomers,
        date: activeUser.date,
        activityLevel: UserActivityLevel.Active,
      };
    });
    inactiveUsers.forEach((inactiveUser) => {
      activeInactiveUsers.push({
        count: inactiveUser.inactiveCustomers,
        date: inactiveUser.date,
        activityLevel: UserActivityLevel.Inactive,
      });
    });
    return activeInactiveUsers;
  }

  async countryDistribution(): Promise<CountryDistributionDTO[]> {
    // Look through the customer table and count the number of customers per country
    const countryDistribution = await this.customerRepository
      .createQueryBuilder('customer')
      .select('customer.countryIso as country')
      .addSelect('COUNT(customer.id) as count')
      .groupBy('country')
      .getRawMany();
    return countryDistribution;
  }

  async _activeUsers(
    input: ChartFilterInput,
  ): Promise<{ activeCustomers: number; date: Date }[]> {
    return [];
    return this.customerRepository
      .createQueryBuilder('customer')
      .select(
        'ANY_VALUE(COALESCE(taxi_order.requestTimestamp, shop_order.createdAt, park_order.createdAt))',
        'date',
      )
      .addSelect('taxi_order.requestTimestamp')
      .addSelect('shop_order.createdAt')
      .addSelect('park_order.createdAt')
      .addSelect('COUNT(DISTINCT customer.id)', 'activeCustomers')
      .leftJoin('customer.orders', 'taxi_order')
      .leftJoin('customer.shopOrders', 'shop_order')
      .leftJoin('customer.orderedParkOrders', 'park_order')
      .where(
        `(taxi_order.requestTimestamp BETWEEN :startDate AND :endDate)
          OR (shop_order.createdAt BETWEEN :startDate AND :endDate)
          OR (park_order.createdAt BETWEEN :startDate AND :endDate)`,
        { startDate: input.startDate, endDate: input.endDate },
      )
      .groupBy(
        this.getGroupByDate(
          input.interval,
          'COALESCE(taxi_order.requestTimestamp, shop_order.createdAt, park_order.createdAt)',
        ).groupBy,
      )
      .getRawMany();
  }

  async _inactiveUsers(
    input: ChartFilterInput,
  ): Promise<{ inactiveCustomers: number; date: Date }[]> {
    return [];
    return this.customerRepository
      .createQueryBuilder('customer')
      .select(
        'ANY_VALUE(COALESCE(taxi_order.createdOn, shop_order.createdAt, park_order.createdAt))',
        'date',
      )
      .addSelect('taxi_order.createdOn')
      .addSelect('shop_order.createdAt')
      .addSelect('park_order.createdAt')
      .addSelect('COUNT(DISTINCT customer.id)', 'inactiveCustomers')
      .leftJoin('customer.orders', 'taxi_order')
      .leftJoin('customer.shopOrders', 'shop_order')
      .leftJoin('customer.orderedParkOrders', 'park_order')
      .where(
        `(taxi_order.createdOn < :startDate)
          AND (shop_order.createdAt < :startDate)
          AND (park_order.createdAt < :startDate)`,
        { startDate: input.startDate },
      )
      .groupBy(
        this.getGroupByDate(
          input.interval,
          'COALESCE(taxi_order.createdOn, shop_order.createdAt, park_order.createdAt)',
        ).groupBy,
      )
      .getRawMany();
  }

  private getGroupByDate(
    query: ChartInterval,
    timeField: string,
  ): { groupBy: string } {
    switch (query) {
      case ChartInterval.Daily:
        return {
          groupBy: `DATE(${timeField}),TIME(${timeField})`,
        };
      case ChartInterval.Monthly:
        return {
          groupBy: `DAYOFYEAR(${timeField}),YEAR(${timeField})`,
        };
      case ChartInterval.Quarterly:
        return {
          groupBy: `QUARTER(${timeField}),YEAR(${timeField})`,
        };
      case ChartInterval.Yearly:
        return {
          groupBy: `MONTH(${timeField}),YEAR(${timeField})`,
        };
    }
  }
}
