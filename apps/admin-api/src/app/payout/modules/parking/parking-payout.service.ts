import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingPayoutSessionEntity } from '@ridy/database';
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
import { ParkingExportCSV } from './dto/parking-export-csv';
import { ForbiddenError } from '@nestjs/apollo';
import { PayoutSessionStatus } from '@ridy/database';
import { ParkingTransactionEntity } from '@ridy/database';
import { ParkingWalletEntity } from '@ridy/database';
import { ParkingPayoutSessionPayoutMethodDetailEntity } from '@ridy/database';
import { ParkingTransactionDebitType } from '@ridy/database';
import { TransactionType } from '@ridy/database';

@Injectable()
export class ParkingPayoutService {
  constructor(
    @InjectRepository(ParkingPayoutSessionEntity)
    private payoutSessionRepository: Repository<ParkingPayoutSessionEntity>,
    @InjectRepository(ParkingPayoutSessionPayoutMethodDetailEntity)
    private payoutSessionPayoutMethodDetailRepository: Repository<ParkingPayoutSessionPayoutMethodDetailEntity>,
    @InjectRepository(ParkingTransactionEntity)
    private parkingTransactionRepository: Repository<ParkingTransactionEntity>,
    @InjectRepository(ParkingWalletEntity)
    private parkingWalletRepository: Repository<ParkingWalletEntity>,
  ) {}

  async createPayoutSession(
    operatorId: number,
    input: CreatePayoutSessionInput,
  ): Promise<ParkingPayoutSessionEntity> {
    const parkingWallets = await this.parkingWalletRepository.find({
      where: {
        currency: input.currency,
        balance: MoreThan(input.minimumAmount),
      },
      relations: ['parking', 'parking.payoutAccounts'],
    });
    if (parkingWallets.length === 0) {
      throw new ForbiddenError('No parkings to payout with these filters');
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

    parkingWallets.forEach(async (parkingWallet) => {
      const defaultPayoutAccount = parkingWallet.customer.payoutAccounts.find(
        (account) => account.isDefault,
      );
      if (defaultPayoutAccount) {
        totalAmount += parkingWallet.balance;
        const transaction = this.parkingTransactionRepository.create({
          customerId: parkingWallet.customerId,
          amount: parkingWallet.balance,
          currency: parkingWallet.currency,
          status: TransactionStatus.Processing,
          type: TransactionType.Debit,
          debitType: ParkingTransactionDebitType.Payout,
          payoutSessionId: payoutSession.id,
          payoutAccountId: defaultPayoutAccount.id,
          payoutMethodId: defaultPayoutAccount.payoutMethodId,
          payoutSessionMethodId: payoutSessionPayoutMethodDetails.find(
            (detail) =>
              detail.payoutMethodId === defaultPayoutAccount.payoutMethodId,
          )?.id,
        });
        await this.parkingTransactionRepository.save(transaction);
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

  async exportToCsv(input: ExportSessionToCsvInput): Promise<{ url: string }> {
    const parkingTransactions = await this.parkingTransactionRepository.find({
      where: {
        payoutSessionId: input.payoutSessionId,
        payoutMethodId: input.payoutMethodId,
        status: TransactionStatus.Processing,
      },
      relations: ['parking', 'payoutAccount', 'payoutMethod'],
    });
    const result: ParkingExportCSV[] = parkingTransactions.map(
      (transaction) => {
        return {
          transactionId: transaction.id,
          parkingOwnerFirstName: transaction.customer.firstName,
          parkingOwnerLastName: transaction.customer.lastName,
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
      },
    );
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
    const parkingTransactions = await this.parkingTransactionRepository.find({
      where: {
        payoutSessionId: input.payoutSessionId,
        payoutMethodId: input.payoutMethodId,
        status: TransactionStatus.Processing,
      },
      relations: ['parking', 'payoutAccount', 'payoutMethod'],
    });
    for (const transaction of parkingTransactions) {
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
        this.parkingWalletRepository.decrement(
          {
            customerId: transaction.customerId,
            currency: transaction.currency,
          },
          'balance',
          transaction.amount,
        );
        await this.parkingTransactionRepository.update(transaction.id, {
          status: TransactionStatus.Done,
          documentNumber: stripeTransaction.id,
        });
      }
    }
  }
}
