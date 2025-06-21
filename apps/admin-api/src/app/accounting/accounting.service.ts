import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from '@ridy/database';
import { ProviderTransactionEntity } from '@ridy/database';
import { CustomerEntity } from '@ridy/database';
import {
  Between,
  DataSource,
  FindManyOptions,
  In,
  Like,
  Repository,
} from 'typeorm';
import { ChartTimeframe } from './dto/chart-timeframe.enum.js';
import { IncomeResultItem } from './dto/income-result-item.dto';
import { RegistrationResultItemDto } from './dto/registration-result-item.dto';
import { RequestResultItem } from './dto/request-result-item.dto';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { json2csv } from 'json-2-csv';
import { RiderWalletEntity } from '@ridy/database';
import { DriverWalletEntity } from '@ridy/database';
import { ExportArgsDTO } from './dto/export.dto';
import { FleetWalletEntity } from '@ridy/database';
import { ShopWalletEntity } from '@ridy/database';
import { ProviderDeductTransactionType } from '@ridy/database';
import { TotalDailyPairDTO } from './dto/total-daily-pair.dto';
import { RiderTransactionEntity } from '@ridy/database';
import { DriverTransactionEntity } from '@ridy/database';
import { FleetTransactionEntity } from '@ridy/database';
import { ShopTransactionEntity } from '@ridy/database';
import { ProviderRechargeTransactionType } from '@ridy/database';

@Injectable()
export class AccountingService {
  constructor(
    @InjectRepository(ProviderTransactionEntity)
    private providerTransactionRepository: Repository<ProviderTransactionEntity>,
    @InjectRepository(RiderTransactionEntity)
    private riderTransactionRepository: Repository<RiderTransactionEntity>,
    @InjectRepository(DriverTransactionEntity)
    private driverTransactionRepository: Repository<DriverTransactionEntity>,
    @InjectRepository(FleetTransactionEntity)
    private fleetTransactionRepository: Repository<FleetTransactionEntity>,
    @InjectRepository(ShopTransactionEntity)
    private shopTransactionRepository: Repository<ShopTransactionEntity>,
    @InjectRepository(RiderWalletEntity)
    private riderWalletRepository: Repository<RiderWalletEntity>,
    @InjectRepository(DriverWalletEntity)
    private driverWalletRepository: Repository<DriverWalletEntity>,
    @InjectRepository(FleetWalletEntity)
    private fleetWalletRepository: Repository<FleetWalletEntity>,
    @InjectRepository(ShopWalletEntity)
    private shopWalletRepository: Repository<ShopWalletEntity>,
    @InjectRepository(CustomerEntity)
    private riderRepository: Repository<CustomerEntity>,
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
    private dataSource: DataSource,
  ) {}

  incomeChart(timeframe: ChartTimeframe): Promise<IncomeResultItem[]> {
    const vars = this.getQueryVars(timeframe, 'transactionTime');
    return this.providerTransactionRepository.query(
      `SELECT currency, SUM(amount) as sum, UNIX_TIMESTAMP(ANY_VALUE(transactionTime)) * 1000 AS time from admin_transaction WHERE ${vars.query} GROUP BY currency, ${vars.groupBy}`,
    );
  }

  requestsChart(timeframe: ChartTimeframe): Promise<RequestResultItem[]> {
    const vars = this.getQueryVars(timeframe, 'requestTimestamp');
    return this.providerTransactionRepository.query(
      `SELECT COUNT(status) as count, status, UNIX_TIMESTAMP(ANY_VALUE(requestTimestamp)) * 1000 AS time from \`request\` WHERE ${vars.query} GROUP BY ${vars.groupBy}, status`,
    );
  }

  driverRegistrations(
    timeframe: ChartTimeframe,
  ): Promise<RegistrationResultItemDto[]> {
    const vars = this.getQueryVars(timeframe, 'registrationTimestamp');
    return this.driverRepository.query(
      `SELECT COUNT(id) as count, UNIX_TIMESTAMP(ANY_VALUE(registrationTimestamp)) * 1000 AS time from driver WHERE ${vars.query} GROUP BY ${vars.groupBy}`,
    );
  }

  riderRegistrations(
    timeframe: ChartTimeframe,
  ): Promise<RegistrationResultItemDto[]> {
    const vars = this.getQueryVars(timeframe, 'registrationTimestamp');
    return this.riderRepository.query(
      `SELECT COUNT(id) as count, UNIX_TIMESTAMP(ANY_VALUE(registrationTimestamp)) * 1000 AS time from rider WHERE ${vars.query} GROUP BY ${vars.groupBy}`,
    );
  }

  private getQueryVars(
    query: ChartTimeframe,
    timeField: string,
  ): { groupBy: string; query: string } {
    switch (query) {
      case ChartTimeframe.Daily:
        return {
          groupBy: `DATE(${timeField}),TIME(${timeField})`,
          query: `DATE(${timeField}) = CURDATE()`,
        };
      case ChartTimeframe.Monthly:
        return {
          groupBy: `DAYOFYEAR(${timeField}),YEAR(${timeField})`,
          query: `${timeField} > CURDATE() - INTERVAL 2 MONTH`,
        };
      case ChartTimeframe.Weekly:
        return {
          groupBy: `WEEKOFYEAR(${timeField}),YEAR(${timeField})`,
          query: `${timeField} > CURDATE() - INTERVAL 6 MONTH`,
        };
      case ChartTimeframe.Yearly:
        return {
          groupBy: `MONTH(${timeField}),YEAR(${timeField})`,
          query: `${timeField} > CURDATE() - INTERVAL 12 MONTH`,
        };
    }
  }

  async exportTable(input: ExportArgsDTO) {
    const options: FindManyOptions = {};
    if (input.filters) {
      for (const f of input.filters) {
        if (typeof f.value != 'string') continue;
        if (f.value.includes('^')) {
          const a = f.value.split('^');
          f.value = Between(a[0], a[1]) as any;
        } else if (f.value.startsWith('%') && f.value.endsWith('%')) {
          f.value = Like(f.value) as any;
        } else if (f.value.includes('|')) {
          const s = f.value.split('|');
          f.value = In(s) as any;
        }
      }
      options.where = input.filters.map((filter) => {
        const obj = {};
        obj[filter.field] = filter.value;
      });
    }
    if (input.sort) {
      const _sort = {};
      _sort[input.sort.property] = input.sort.direction;
      options.order = _sort;
    }
    if (input.relations != null) {
      options.relations = input.relations;
    }
    const result = (await this.dataSource
      .getRepository(`${input.table}Entity`)
      .find(options)) as any[];
    if (input.table == 'DriverWallet' && process.env.DEMO_MODE != null) {
      (result as DriverWalletEntity[]).forEach((x) => {
        const length = x.driver.mobileNumber.length;
        x.driver.mobileNumber = `${x.driver.mobileNumber
          .toString()
          .substring(0, length - 3)}xxxx`;
        x.driver.email = 'Confidential';
      });
    }
    if (input.table == 'RiderWallet' && process.env.DEMO_MODE != null) {
      (result as RiderWalletEntity[]).forEach((x) => {
        const length = x.rider.mobileNumber.length;
        x.rider.mobileNumber = `${x.rider.mobileNumber
          .toString()
          .substring(0, length - 3)}xxxx`;
        x.rider.email = 'Confidential';
      });
    }
    if (input.type == 'csv') {
      const str = await json2csv(result);
      const fileName = `${new Date().getTime().toString()}.csv`;
      await writeFile(
        join(
          process.cwd(),
          'uploads',
          `${new Date().getTime().toString()}.csv`,
        ),
        str,
      );
      return {
        url: `uploads/${fileName}`,
      };
    }
    return undefined;
  }

  async totalRevenue(input: { currency: string }): Promise<TotalDailyPairDTO> {
    const total = await this.providerTransactionRepository.sum('amount', {
      currency: input.currency,
      rechargeType: In([ProviderRechargeTransactionType.Commission]),
    });
    const todayRevenue = await this.providerTransactionRepository.sum(
      'amount',
      {
        currency: input.currency,
        rechargeType: In([ProviderRechargeTransactionType.Commission]),
        createdAt: Between(
          new Date(new Date().setHours(0, 0, 0, 0)),
          new Date(new Date().setHours(23, 59, 59, 999)),
        ),
      },
    );
    return {
      total: total ?? 0,
      daily: todayRevenue ?? 0,
    };
  }

  async totaloutstandingUserBalances(input: {
    currency: string;
  }): Promise<TotalDailyPairDTO> {
    const sumRiderWalletoutstandingUserBalances = (
      await this.riderWalletRepository
        .createQueryBuilder()
        .select('SUM(amount)', 'balance')
        .where('currency = :currency', { currency: input.currency })
        .getRawOne()
    )?.balance;

    const sumDriverWalletoutstandingUserBalances = (
      await this.driverWalletRepository
        .createQueryBuilder()
        .select('SUM(amount)', 'balance')
        .where('currency = :currency', { currency: input.currency })
        .getRawOne()
    ).balance;
    const sumFleetWalletoutstandingUserBalances = (
      await this.fleetWalletRepository
        .createQueryBuilder()
        .select('SUM(amount)', 'balance')
        .where('currency = :currency', { currency: input.currency })
        .getRawOne()
    ).balance;
    const sumShopWalletoutstandingUserBalances =
      await this.shopWalletRepository.sum('balance', {
        currency: input.currency,
      });
    const total =
      (sumRiderWalletoutstandingUserBalances ?? 0) +
      (sumDriverWalletoutstandingUserBalances ?? 0) +
      (sumFleetWalletoutstandingUserBalances ?? 0) +
      (sumShopWalletoutstandingUserBalances ?? 0);
    const riderToday = await this.riderTransactionRepository.sum('amount', {
      currency: input.currency,
      createdAt: Between(
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 999)),
      ),
    });
    const driverToday = await this.driverTransactionRepository.sum('amount', {
      currency: input.currency,
      createdAt: Between(
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 999)),
      ),
    });
    const fleetToday = await this.fleetTransactionRepository.sum('amount', {
      currency: input.currency,
      transactionTimestamp: Between(
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 999)),
      ),
    });
    const shopToday = await this.shopTransactionRepository.sum('amount', {
      currency: input.currency,
      createdAt: Between(
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 999)),
      ),
    });
    const daily =
      (riderToday ?? 0) +
      (driverToday ?? 0) +
      (fleetToday ?? 0) +
      (shopToday ?? 0);
    return {
      total: total ?? 0,
      daily: daily ?? 0,
    };
  }

  async totalExpenses(input: { currency: string }): Promise<TotalDailyPairDTO> {
    const totalExpenses = await this.providerTransactionRepository.sum(
      'amount',
      {
        currency: input.currency,
        deductType: ProviderDeductTransactionType.Expense,
      },
    );
    const todayExpenses = await this.providerTransactionRepository.sum(
      'amount',
      {
        currency: input.currency,
        deductType: ProviderDeductTransactionType.Expense,
        createdAt: Between(
          new Date(new Date().setHours(0, 0, 0, 0)),
          new Date(new Date().setHours(23, 59, 59, 999)),
        ),
      },
    );
    return {
      total: totalExpenses ?? 0,
      daily: todayExpenses ?? 0,
    };
  }
}
