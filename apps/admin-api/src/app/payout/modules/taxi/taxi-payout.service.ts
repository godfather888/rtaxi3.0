import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxiPayoutSessionEntity } from '@ridy/database';
import { MoreThan, Repository } from 'typeorm';
import { CreatePayoutSessionInput } from '../../dto/create-payout-session.input';
import { ExportSessionToCsvInput } from '../../dto/export-session-to-csv.input';
import { TransactionStatus } from '@ridy/database';
import { json2csv } from 'json-2-csv';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { RunAutoPayoutInput } from '../../dto/run-auto-payout.input';
import { PayoutMethodType } from '@ridy/database';
import Stripe from 'stripe';
import { DriverTransactionEntity } from '@ridy/database';
import { DriverWalletEntity } from '@ridy/database';
import { TransactionAction } from '@ridy/database';
import { DriverDeductTransactionType } from '@ridy/database';
import { DriverExportCSV } from './dto/driver-export-csv';
import { ForbiddenError } from '@nestjs/apollo';
import { TaxiPayoutSessionPayoutMethodDetailEntity } from '@ridy/database';
import { PayoutSessionStatus } from '@ridy/database';
import {
  PayoutMethodStatsDTO,
  PayoutStatisticsDTO,
} from '../../dto/payout-statistics.dto';
import { RegionEntity } from '@ridy/database';
import { PayoutMethodEntity } from '@ridy/database';
import { ManualPayoutInput } from '../../dto/manual-payout.input';
import { DriverTransactionDTO } from '../../../driver/dto/driver-transaction.dto';

@Injectable()
export class TaxiPayoutService {
  constructor(
    @InjectRepository(TaxiPayoutSessionEntity)
    private payoutSessionRepository: Repository<TaxiPayoutSessionEntity>,
    @InjectRepository(TaxiPayoutSessionPayoutMethodDetailEntity)
    private payoutSessionPayoutMethodDetailRepository: Repository<TaxiPayoutSessionPayoutMethodDetailEntity>,
    @InjectRepository(DriverTransactionEntity)
    private driverTransactionRepository: Repository<DriverTransactionEntity>,
    @InjectRepository(DriverWalletEntity)
    private driverWalletRepository: Repository<DriverWalletEntity>,
    @InjectRepository(RegionEntity)
    private regionRepository: Repository<RegionEntity>,
    @InjectRepository(PayoutMethodEntity)
    private payoutMethodRepository: Repository<PayoutMethodEntity>,
  ) {}

  async createPayoutSession(
    operatorId: number,
    input: CreatePayoutSessionInput,
  ): Promise<TaxiPayoutSessionEntity> {
    const driverWallets = await this.driverWalletRepository.find({
      where: {
        currency: input.currency,
        balance: MoreThan(input.minimumAmount),
      },
      relations: ['driver', 'driver.payoutAccounts'],
    });
    if (driverWallets.length === 0) {
      throw new ForbiddenError('No drivers to payout with these filters');
    }
    const session = this.payoutSessionRepository.create({
      createdByOperatorId: operatorId,
      currency: input.currency,
      description: input.description,
      totalAmount: 0,
      payoutMethods: input.payoutMethodIds.map((id) => ({ id })),
    });
    let payoutSession = await this.payoutSessionRepository.save(session);
    for (const payoutMethod of input.payoutMethodIds) {
      const detail = this.payoutSessionPayoutMethodDetailRepository.create({
        payoutSessionId: payoutSession.id,
        payoutMethodId: payoutMethod,
        status: PayoutSessionStatus.PENDING,
      });
      await this.payoutSessionPayoutMethodDetailRepository.save(detail);
    }
    let totalAmount = 0;
    const payoutSessionPayoutMethodDetails =
      await this.payoutSessionPayoutMethodDetailRepository.find({
        where: {
          payoutSessionId: payoutSession.id,
        },
      });

    driverWallets.forEach(async (driverWallet) => {
      const defaultPayoutAccount = driverWallet.driver.payoutAccounts.find(
        (account) => account.isDefault,
      );
      if (defaultPayoutAccount) {
        totalAmount += driverWallet.balance;
        const transaction = this.driverTransactionRepository.create({
          driverId: driverWallet.driver.id,
          amount: driverWallet.balance,
          currency: driverWallet.currency,
          status: TransactionStatus.Processing,
          action: TransactionAction.Deduct,
          deductType: DriverDeductTransactionType.Withdraw,
          payoutSessionId: payoutSession.id,
          payoutAccountId: defaultPayoutAccount.id,
          payoutMethodId: defaultPayoutAccount.payoutMethodId,
          payoutSessionMethodId: payoutSessionPayoutMethodDetails.find(
            (detail) =>
              detail.payoutMethodId === defaultPayoutAccount.payoutMethodId,
          )?.id,
        });
        await this.driverTransactionRepository.save(transaction);
      }
    });

    await this.payoutSessionRepository.update(payoutSession.id, {
      totalAmount,
    });
    payoutSession = await this.payoutSessionRepository.findOneBy({
      id: session.id,
    });

    return payoutSession;
  }

  async getSupportedCurrencies(): Promise<string[]> {
    const regions = await this.regionRepository.find();
    const currencies = regions.map((region) => region.currency);
    const distinctCurrencies = [...new Set(currencies)];
    return distinctCurrencies;
  }

  async getPendingAmount(currency: string): Promise<number> {
    const pendingAmount = await this.driverWalletRepository.find({
      where: { currency, balance: MoreThan(0) },
    });
    const sum = pendingAmount.reduce((a, b) => a + (b.balance || 0), 0);
    return sum || 0;
  }

  async getLastPayoutAmount(currency: string): Promise<number> {
    const lastPayout = await this.payoutSessionRepository.findOne({
      where: {
        currency,
        status: PayoutSessionStatus.PAID,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    if (!lastPayout) {
      return 0;
    }
    return lastPayout.totalAmount;
  }

  async getPayoutStatistics(input: {
    currency?: string;
  }): Promise<PayoutStatisticsDTO> {
    let { currency } = input;
    if (!currency) {
      const currentCurrencies = await this.getSupportedCurrencies();
      currency = currentCurrencies.length > 0 ? currentCurrencies[0] : 'USD';
    }
    const pendingAmount = await this.getPendingAmount(currency);
    const lastPayoutAmount = await this.getLastPayoutAmount(currency);
    const payoutMethodStats = await this.getDriversDefaultPayoutMethodStats(
      currency,
    );
    return {
      pendingAmount,
      lastPayoutAmount,
      currency,
      usersDefaultPayoutMethodStats: payoutMethodStats,
    };
  }

  async getDriversDefaultPayoutMethodStats(
    currency: string,
  ): Promise<PayoutMethodStatsDTO[]> {
    const driverWallets = await this.driverWalletRepository.find({
      where: { currency },
      relations: ['driver', 'driver.payoutAccounts'],
    });
    const payoutMethods = await this.payoutMethodRepository.find({
      where: { currency },
    });
    const result: PayoutMethodStatsDTO[] = [];
    payoutMethods.forEach((payoutMethod) => {
      const driverWalletsWithPayoutMethod = driverWallets.filter(
        (driverWallet) => {
          if (driverWallet.driver == null) {
            // This drivers have deleted their account
            return false;
          }
          return driverWallet.driver.payoutAccounts.find(
            (account) =>
              account.payoutMethodId === payoutMethod.id && account.isDefault,
          );
        },
      );
      if (driverWalletsWithPayoutMethod.length > 0) {
        result.push({
          payoutMethod,
          totalCount: driverWalletsWithPayoutMethod.length,
        });
      }
    });
    const driversWithoutDefaultPayoutMethod = driverWallets.filter(
      (driverWallet) => {
        if (driverWallet.driver == null) {
          // This drivers have deleted their account
          return false;
        }
        return (
          driverWallet.driver.payoutAccounts.filter(
            (account) => account.isDefault,
          ).length === 0
        );
      },
    );
    if (driversWithoutDefaultPayoutMethod.length > 0) {
      result.push({
        payoutMethod: null,
        totalCount: driversWithoutDefaultPayoutMethod.length,
      });
    }
    return result;
  }

  async manualPayout(input: ManualPayoutInput): Promise<DriverTransactionDTO> {
    const driverTransaction = await this.driverTransactionRepository.findOneBy({
      id: input.userTransactionId,
    });
    this.driverTransactionRepository.update(input.userTransactionId, {
      refrenceNumber: input.transactionNumber,
      description: input.description,
      status: TransactionStatus.Done,
    });
    this.driverWalletRepository.decrement(
      {
        driverId: driverTransaction.driverId,
        currency: driverTransaction.currency,
      },
      'balance',
      driverTransaction.amount,
    );
    return this.driverTransactionRepository.findOneBy({
      id: input.userTransactionId,
    });
  }

  async exportToCsv(input: ExportSessionToCsvInput): Promise<{ url: string }> {
    const driverTransactions = await this.driverTransactionRepository.find({
      where: {
        payoutSessionId: input.payoutSessionId,
        payoutMethodId: input.payoutMethodId,
        status: TransactionStatus.Processing,
      },
      relations: ['driver', 'payoutAccount', 'payoutMethod'],
    });
    const result: DriverExportCSV[] = driverTransactions.map((transaction) => {
      return {
        transactionId: transaction.id,
        driverFirstName: transaction.driver.firstName,
        driverLastName: transaction.driver.lastName,
        amount: transaction.amount,
        currency: transaction.currency,
        accountNumber: transaction.payoutAccount.accountNumber,
        routingNumber: transaction.payoutAccount.routingNumber,
        bankName: transaction.payoutAccount.bankName,
        branchName: transaction.payoutAccount.branchName,
        accountHolderName: transaction.payoutAccount.accountHolderName,
        accountHolderCountry: transaction.payoutAccount.accountHolderCountry,
        accountHolderState: transaction.payoutAccount.accountHolderState,
        accountHolderCity: transaction.payoutAccount.accountHolderCity,
        accountHolderAddress: transaction.payoutAccount.accountHolderAddress,
        accountHolderZip: transaction.payoutAccount.accountHolderZip,
      };
    });
    const str = await json2csv(result);
    const fileName = `${new Date().getTime().toString()}.csv`;
    await writeFile(
      join(process.cwd(), 'uploads', `${new Date().getTime().toString()}.csv`),
      str,
    );
    return {
      url: `uploads/${fileName}`,
    };
  }

  async runAutoPayout(input: RunAutoPayoutInput) {
    const driverTransactions = await this.driverTransactionRepository.find({
      where: {
        payoutSessionId: input.payoutSessionId,
        payoutMethodId: input.payoutMethodId,
        status: TransactionStatus.Processing,
      },
      relations: {
        driver: true,
        payoutAccount: true,
        payoutMethod: true,
      },
    });
    for (const transaction of driverTransactions) {
      if (transaction.payoutMethod.type == PayoutMethodType.Stripe) {
        const instance = new Stripe(transaction.payoutMethod.privateKey!, {
          apiVersion: '2022-11-15',
        });
        const stripeTransaction = await instance.transfers.create({
          amount: Math.floor(transaction.amount * 100),
          currency: transaction.currency,
          destination: transaction.payoutAccount.token,
          description: 'Payout',
        });
        this.driverWalletRepository.decrement(
          {
            driverId: transaction.driverId,
            currency: transaction.currency,
          },
          'balance',
          transaction.amount,
        );
        await this.driverTransactionRepository.update(transaction.id, {
          status: TransactionStatus.Done,
          refrenceNumber: stripeTransaction.id,
        });
      }
    }
  }
}
