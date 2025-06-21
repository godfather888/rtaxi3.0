import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from '@ridy/database';
import { MoreThan, Repository } from 'typeorm';
import { DriverTransactionEntity } from '@ridy/database';
import { DriverWalletEntity } from '@ridy/database';
import { PayoutMethodStatsDTO } from './dto/payout-statistics.dto';
import { json2csv } from 'json-2-csv';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { ExportSessionToCsvInput } from './dto/export-session-to-csv.input';
import { RunAutoPayoutInput } from './dto/run-auto-payout.input';
import { TransactionStatus } from '@ridy/database';
import { PayoutMethodType } from '@ridy/database';
import { Stripe } from 'stripe';
import { ManualPayoutInput } from './dto/manual-payout.input';
import { PayoutMethodEntity } from '@ridy/database';
import { AppType } from '@ridy/database';
import { ShopWalletEntity } from '@ridy/database';
import { ParkingWalletEntity } from '@ridy/database';
import { ShopTransactionEntity } from '@ridy/database';
import { ParkingTransactionEntity } from '@ridy/database';
import { DriverExportCSV } from './modules/taxi/dto/driver-export-csv';

@Injectable()
export class PayoutService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
    @InjectRepository(PayoutMethodEntity)
    private readonly payoutMethodRepository: Repository<PayoutMethodEntity>,
    @InjectRepository(DriverWalletEntity)
    private readonly driverWalletRepository: Repository<DriverWalletEntity>,
    @InjectRepository(ShopWalletEntity)
    private readonly shopWalletRepository: Repository<ShopWalletEntity>,
    @InjectRepository(ParkingWalletEntity)
    private readonly parkingWalletRepository: Repository<ParkingWalletEntity>,
    @InjectRepository(DriverTransactionEntity)
    private readonly driverTransactionRepository: Repository<DriverTransactionEntity>,
    @InjectRepository(ShopTransactionEntity)
    private readonly shopTransactionRepository: Repository<ShopTransactionEntity>,
    @InjectRepository(ParkingTransactionEntity)
    private readonly parkingTransactionRepository: Repository<ParkingTransactionEntity>,
  ) {}

  async getSupportedCurrencies(): Promise<string[]> {
    const regions = await this.regionRepository.find();
    const currencies = regions.map((region) => region.currency);
    const distinctCurrencies = [...new Set(currencies)];
    return distinctCurrencies;
  }

  // async getPayoutStatistics(input: {
  //   currency?: string;
  // }): Promise<PayoutStatisticsDTO> {
  //   let { currency } = input;
  //   if (!currency) {
  //     const currentCurrencies = await this.getSupportedCurrencies();
  //     currency = currentCurrencies.length > 0 ? currentCurrencies[0] : 'USD';
  //   }
  //   const pendingAmount = await this.getPendingAmount(currency);
  //   const lastPayoutAmount = await this.getLastPayoutAmount(currency);
  //   const payoutMethodStats = await this.getDriversDefaultPayoutMethodStats(
  //     currency,
  //   );
  //   return {
  //     pendingAmount,
  //     lastPayoutAmount,
  //     currency,
  //     usersDefaultPayoutMethodStats: payoutMethodStats,
  //   };
  // }

  async getPendingAmount(currency: string): Promise<number> {
    const pendingAmount = await this.driverWalletRepository.find({
      where: { currency, balance: MoreThan(0) },
    });
    const sum = pendingAmount.reduce((a, b) => a + (b.balance || 0), 0);
    return sum || 0;
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

  // async getLastPayoutAmount(currency: string): Promise<number> {
  //   const lastPayout = await this.payoutSessionRepository.findOne({
  //     where: {
  //       currency,
  //       status: PayoutSessionStatus.PAID,
  //     },
  //     order: {
  //       createdAt: 'DESC',
  //     },
  //   });
  //   if (!lastPayout) {
  //     return 0;
  //   }
  //   return lastPayout.totalAmount;
  // }

  // async createPayoutSession(
  //   operatorId: number,
  //   input: CreatePayoutSessionInput,
  // ): Promise<TaxiPayoutSessionEntity> {
  //   const session = this.payoutSessionRepository.create({
  //     createdByOperatorId: operatorId,
  //     currency: input.currency,
  //     description: input.description,
  //     totalAmount: 0,
  //     payoutMethods: input.payoutMethodIds.map((id) => ({ id })),
  //   });
  //   const result = await this.payoutSessionRepository.save(session);
  //   let totalAmount = 0;

  //   if (input.appType == AppType.Taxi) {
  //     const driverWallets = await this.driverWalletRepository.find({
  //       where: {
  //         currency: input.currency,
  //         balance: MoreThan(input.minimumAmount),
  //       },
  //       relations: ['driver', 'driver.payoutAccounts'],
  //     });
  //     driverWallets.forEach(async (driverWallet) => {
  //       const defaultPayoutAccount = driverWallet.driver.payoutAccounts.find(
  //         (account) => account.isDefault,
  //       );
  //       if (defaultPayoutAccount) {
  //         totalAmount += driverWallet.balance;
  //         const transaction = this.driverTransactionRepository.create({
  //           driverId: driverWallet.driver.id,
  //           amount: driverWallet.balance,
  //           currency: driverWallet.currency,
  //           action: TransactionAction.Deduct,
  //           deductType: DriverDeductTransactionType.Withdraw,
  //           payoutSessionId: result.id,
  //           payoutAccountId: defaultPayoutAccount.id,
  //           payoutMethodId: defaultPayoutAccount.payoutMethodId,
  //         });
  //         await this.driverTransactionRepository.save(transaction);
  //       }
  //     });
  //   }
  //   if (input.appType == AppType.Shop) {
  //     const shopWallets = await this.shopWalletRepository.find({
  //       where: {
  //         currency: input.currency,
  //         balance: MoreThan(input.minimumAmount),
  //       },
  //       relations: ['shop', 'shop.payoutAccounts'],
  //     });
  //     shopWallets.forEach(async (shopWalet) => {
  //       const defaultPayoutAccount = shopWalet.shop.payoutAccounts.find(
  //         (account) => account.isDefault,
  //       );
  //       if (defaultPayoutAccount) {
  //         totalAmount += shopWalet.balance;
  //         const transaction = this.shopTransactionRepository.create({
  //           shopId: shopWalet.shop.id,
  //           amount: shopWalet.balance,
  //           currency: shopWalet.currency,
  //           type: TransactionType.Debit,
  //           debitType: ShopTransactionDebitType.Payout,
  //           payoutSessionId: result.id,
  //           payoutAccountId: defaultPayoutAccount.id,
  //           payoutMethodId: defaultPayoutAccount.payoutMethodId,
  //         });
  //         await this.driverTransactionRepository.save(transaction);
  //       }
  //     });
  //   }
  //   if (input.appType == AppType.Parking) {
  //     const parkingWallets = await this.parkingWalletRepository.find({
  //       where: {
  //         currency: input.currency,
  //         balance: MoreThan(input.minimumAmount),
  //       },
  //       relations: ['customer', 'customer.payoutAccounts'],
  //     });
  //     parkingWallets.forEach(async (parkingWallet) => {
  //       const defaultPayoutAccount = parkingWallet.customer.payoutAccounts.find(
  //         (account) => account.isDefault,
  //       );
  //       if (defaultPayoutAccount) {
  //         totalAmount += parkingWallet.balance;
  //         const transaction = this.parkingTransactionRepository.create({
  //           customerId: parkingWallet.customer.id,
  //           amount: parkingWallet.balance,
  //           currency: parkingWallet.currency,
  //           type: TransactionType.Debit,
  //           debitType: ParkingTransactionDebitType.Payout,
  //           payoutSessionId: result.id,
  //           payoutAccountId: defaultPayoutAccount.id,
  //           payoutMethodId: defaultPayoutAccount.payoutMethodId,
  //         });
  //         await this.parkingTransactionRepository.save(transaction);
  //       }
  //     });
  //   }
  //   // if (driverWallets.length === 0) {
  //   //   throw new ForbiddenError('No drivers to payout with these filters');
  //   // }

  //   await this.payoutSessionRepository.update(result.id, { totalAmount });

  //   return result;
  // }

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
      relations: ['driver', 'payoutAccount', 'payoutMethod'],
    });
    for (const transaction of driverTransactions) {
      if (transaction.payoutMethod.type == PayoutMethodType.Stripe) {
        const instance = new Stripe(transaction.payoutMethod.privateKey!, {
          apiVersion: '2022-11-15',
        });
        await instance.transfers.create({
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
        });
      }
    }

    const shopTrnsactions = await this.shopTransactionRepository.find({
      where: {
        payoutSessionId: input.payoutSessionId,
        payoutMethodId: input.payoutMethodId,
        status: TransactionStatus.Processing,
      },
      relations: ['shop', 'payoutAccount', 'payoutMethod'],
    });
    for (const transaction of shopTrnsactions) {
      if (transaction.payoutMethod.type == PayoutMethodType.Stripe) {
        const instance = new Stripe(transaction.payoutMethod.privateKey!, {
          apiVersion: '2022-11-15',
        });
        await instance.transfers.create({
          amount: Math.floor(transaction.amount * 100),
          currency: transaction.currency,
          destination: transaction.payoutAccount.token,
          description: 'Payout',
        });
        this.shopWalletRepository.decrement(
          {
            shopId: transaction.shopId,
            currency: transaction.currency,
          },
          'balance',
          transaction.amount,
        );
        await this.shopTransactionRepository.update(transaction.id, {
          status: TransactionStatus.Done,
        });
      }
    }

    const parkingTransactions = await this.parkingTransactionRepository.find({
      where: {
        payoutSessionId: input.payoutSessionId,
        payoutMethodId: input.payoutMethodId,
        status: TransactionStatus.Processing,
      },
      relations: ['customer', 'payoutAccount', 'payoutMethod'],
    });
    for (const transaction of parkingTransactions) {
      if (transaction.payoutMethod.type == PayoutMethodType.Stripe) {
        const instance = new Stripe(transaction.payoutMethod.privateKey!, {
          apiVersion: '2022-11-15',
        });
        await instance.transfers.create({
          amount: Math.floor(transaction.amount * 100),
          currency: transaction.currency,
          destination: transaction.payoutAccount.token,
          description: 'Payout',
        });
        this.parkingWalletRepository.decrement(
          {
            customerId: transaction.customerId,
            currency: transaction.currency,
          },
          'balance',
          transaction.amount,
        );
        await this.driverTransactionRepository.update(transaction.id, {
          status: TransactionStatus.Done,
        });
      }
    }
  }

  async manualPayout(input: ManualPayoutInput): Promise<boolean> {
    switch (input.appType) {
      case AppType.Taxi: {
        const driverTransaction =
          await this.driverTransactionRepository.findOneBy({
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
        return true;
      }

      case AppType.Shop: {
        const shopTransaction = await this.shopTransactionRepository.findOneBy({
          id: input.userTransactionId,
        });
        this.shopTransactionRepository.update(input.userTransactionId, {
          documentNumber: input.transactionNumber,
          description: input.description,
          status: TransactionStatus.Done,
        });
        this.shopWalletRepository.decrement(
          {
            shopId: shopTransaction.shopId,
            currency: shopTransaction.currency,
          },
          'balance',
          shopTransaction.amount,
        );
        return true;
      }

      case AppType.Parking: {
        const parkingTransaction =
          await this.parkingTransactionRepository.findOneBy({
            id: input.userTransactionId,
          });
        this.parkingTransactionRepository.update(input.userTransactionId, {
          documentNumber: input.transactionNumber,
          description: input.description,
          status: TransactionStatus.Done,
        });
        this.parkingWalletRepository.decrement(
          {
            customerId: parkingTransaction.customerId,
            currency: parkingTransaction.currency,
          },
          'balance',
          parkingTransaction.amount,
        );
        return true;
      }
    }
  }

  // async updatePayoutSession(
  //   id: number,
  //   update: UpdatePayoutSessionInput,
  // ): Promise<TaxiPayoutSessionEntity> {
  //   await this.payoutSessionRepository.update(id, update);
  //   return this.payoutSessionRepository.findOneBy({ id });
  // }
}
