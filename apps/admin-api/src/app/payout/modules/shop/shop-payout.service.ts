import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopPayoutSessionEntity } from '@ridy/database';
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
import { ShopExportCSV } from './dto/shop-export-csv';
import { ForbiddenError } from '@nestjs/apollo';
import { PayoutSessionStatus } from '@ridy/database';
import { ShopTransactionEntity } from '@ridy/database';
import { ShopWalletEntity } from '@ridy/database';
import { ShopPayoutSessionPayoutMethodDetailEntity } from '@ridy/database';
import { ShopTransactionDebitType } from '@ridy/database';
import { TransactionType } from '@ridy/database';

@Injectable()
export class ShopPayoutService {
  constructor(
    @InjectRepository(ShopPayoutSessionEntity)
    private payoutSessionRepository: Repository<ShopPayoutSessionEntity>,
    @InjectRepository(ShopPayoutSessionPayoutMethodDetailEntity)
    private payoutSessionPayoutMethodDetailRepository: Repository<ShopPayoutSessionPayoutMethodDetailEntity>,
    @InjectRepository(ShopTransactionEntity)
    private shopTransactionRepository: Repository<ShopTransactionEntity>,
    @InjectRepository(ShopWalletEntity)
    private shopWalletRepository: Repository<ShopWalletEntity>,
  ) {}

  async createPayoutSession(
    operatorId: number,
    input: CreatePayoutSessionInput,
  ): Promise<ShopPayoutSessionEntity> {
    const shopWallets = await this.shopWalletRepository.find({
      where: {
        currency: input.currency,
        balance: MoreThan(input.minimumAmount),
      },
      relations: ['shop', 'shop.payoutAccounts'],
    });
    if (shopWallets.length === 0) {
      throw new ForbiddenError('No shops to payout with these filters');
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

    shopWallets.forEach(async (shopWallet) => {
      const defaultPayoutAccount = shopWallet.shop.payoutAccounts.find(
        (account) => account.isDefault,
      );
      if (defaultPayoutAccount) {
        totalAmount += shopWallet.balance;
        const transaction = this.shopTransactionRepository.create({
          shopId: shopWallet.shop.id,
          amount: shopWallet.balance,
          currency: shopWallet.currency,
          status: TransactionStatus.Processing,
          type: TransactionType.Debit,
          debitType: ShopTransactionDebitType.Payout,
          payoutSessionId: payoutSession.id,
          payoutAccountId: defaultPayoutAccount.id,
          payoutMethodId: defaultPayoutAccount.payoutMethodId,
          payoutSessionMethodId: payoutSessionPayoutMethodDetails.find(
            (detail) =>
              detail.payoutMethodId === defaultPayoutAccount.payoutMethodId,
          )?.id,
        });
        await this.shopTransactionRepository.save(transaction);
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
    const shopTransactions = await this.shopTransactionRepository.find({
      where: {
        payoutSessionId: input.payoutSessionId,
        payoutMethodId: input.payoutMethodId,
        status: TransactionStatus.Processing,
      },
      relations: ['shop', 'payoutAccount', 'payoutMethod'],
    });
    const result: ShopExportCSV[] = shopTransactions.map((transaction) => {
      return {
        transactionId: transaction.id,
        shopName: transaction.shop.name,
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
    const shopTransactions = await this.shopTransactionRepository.find({
      where: {
        payoutSessionId: input.payoutSessionId,
        payoutMethodId: input.payoutMethodId,
        status: TransactionStatus.Processing,
      },
      relations: ['shop', 'payoutAccount', 'payoutMethod'],
    });
    for (const transaction of shopTransactions) {
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
          documentNumber: stripeTransaction.id,
        });
      }
    }
  }
}
