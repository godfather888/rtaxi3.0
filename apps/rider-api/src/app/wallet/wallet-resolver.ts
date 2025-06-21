import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, Mutation, Resolver, ID, Query } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserContext } from '../auth/authenticated-user';
import { GqlAuthGuard } from '../auth/access-token.guard';
import {
  IntentResultToTopUpWalletStatus,
  TopUpWalletInput,
  TopUpWalletResponse,
} from './dto/top-up-wallet.input';
import {
  CryptoService,
  GatewayLinkMethod,
  PaymentGatewayEntity,
  PaymentGatewayType,
} from '@ridy/database';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { WalletService } from './wallet.service';
import { SavedPaymentMethodEntity } from '@ridy/database';
import {
  IntentResult,
  SetupSavedPaymentMethodDecryptedBody,
} from '@ridy/database';
import { SetupPaymentMethodDto } from './dto/setup_payment_method.dto';
import { GiftCardDTO } from './dto/gift-card.dto';
import { CommonGiftCardService } from '@ridy/database';
import { SavedPaymentMethodDto } from './dto/saved-payment-method.dto';
import { CustomerEntity } from '@ridy/database';
import { PaymentGatewayDTO } from './dto/payment-gateway.dto';

@UseGuards(GqlAuthGuard)
@Resolver()
export class WalletResolver {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepo: Repository<CustomerEntity>,
    @InjectRepository(SavedPaymentMethodEntity)
    private savedPaymentMethodRepo: Repository<SavedPaymentMethodEntity>,
    @InjectRepository(PaymentGatewayEntity)
    private gatewayRepo: Repository<PaymentGatewayEntity>,
    private cryptoService: CryptoService,
    private commongGiftCardService: CommonGiftCardService,
    @Inject(CONTEXT) private context: UserContext,
    private httpService: HttpService,
    private walletService: WalletService,
  ) {}

  @Mutation(() => TopUpWalletResponse)
  async topUpWallet(
    @Args('input', { type: () => TopUpWalletInput }) input: TopUpWalletInput,
    @Args('shouldPreauth', { type: () => Boolean, nullable: true })
    shouldPreauth: boolean,
  ): Promise<TopUpWalletResponse> {
    const paymentLink = await this.walletService.getPaymentLink({
      paymentMode: input.paymentMode,
      gatewayId: input.gatewayId,
      userId: this.context.req.user.id,
      amount: input.amount,
      currency: input.currency,
      orderNumber: input.orderNumber,
      shouldPreauth,
    });
    Logger.log(JSON.stringify(paymentLink), 'paymentLink');
    return {
      status: IntentResultToTopUpWalletStatus(paymentLink.status),
      url: paymentLink.url,
    };
  }

  @Query(() => [SavedPaymentMethodDto])
  async savedPaymentMethods(): Promise<SavedPaymentMethodDto[]> {
    Logger.log(
      `Fetching saved payment methods for rider ID: ${this.context.req.user.id}`,
      'WalletResolver',
    );
    const savedMethods = await this.walletService.getSavedPaymentMethods({
      userId: this.context.req.user.id,
    });
    return savedMethods.map((method) => ({
      ...method,
      riderId: method.riderId ?? this.context.req.user.id,
    }));
  }

  // @Query(() => [PaymentGatewayDTO])
  // async savableGateways(): Promise<PaymentGatewayDTO[]> {
  //   const result = await this.gatewayRepo.find({
  //     where: { type: In([PaymentGatewayType.Stripe]) },
  //   });
  //   return result;
  // }

  @Mutation(() => SetupPaymentMethodDto)
  async setupPaymentMethod(
    @Args('gatewayId', { type: () => ID }) gatewayId: number,
  ): Promise<SetupPaymentMethodDto> {
    const user = await this.customerRepo.findOneOrFail({
      where: { id: this.context.req.user.id },
      relations: {
        wallets: true,
      },
    });
    const walletsLargestBalance =
      user.wallets.length > 0
        ? user.wallets.reduce((prev, current) => {
            return prev.balance > current.balance ? prev : current;
          })
        : { balance: 0, currency: 'USD' };
    const obj: SetupSavedPaymentMethodDecryptedBody = {
      gatewayId: gatewayId.toString(),
      userType: 'rider',
      currency: walletsLargestBalance.currency ?? 'USD',
      userId: this.context.req.user.id.toString(),
      returnUrl: `${
        process.env.RIDER_APPLICATION_ID ?? 'default.rider.redirection'
      }://`,
    };
    const encrypted = await this.cryptoService.encrypt(JSON.stringify(obj));
    const result = await firstValueFrom(
      this.httpService.post<IntentResult>(
        `${process.env.GATEWAY_SERVER_URL}/setup_saved_payment_method`,
        {
          token: encrypted,
        },
      ),
    );
    Logger.log(JSON.stringify(result.data), 'setupPaymentMethod');
    return result.data;
  }

  @Mutation(() => GiftCardDTO)
  async redeemGiftCard(
    @Args('code', { type: () => String }) code: string,
  ): Promise<GiftCardDTO> {
    return this.commongGiftCardService.redeemGiftCard({
      code,
      userId: this.context.req.user.id,
      userType: 'rider',
    });
  }

  @Mutation(() => [SavedPaymentMethodDto])
  async markPaymentMethodAsDefault(
    @Args('id', { type: () => ID }) savedPaymentMethodId: number,
  ): Promise<SavedPaymentMethodDto[]> {
    await this.walletService.markPaymentMethodAsDefault({
      userId: this.context.req.user.id,
      savedPaymentMethodId,
    });
    return this.savedPaymentMethodRepo.find({
      where: { riderId: this.context.req.user.id },
    }) as unknown as SavedPaymentMethodDto[];
  }

  @Mutation(() => [SavedPaymentMethodDto])
  async deleteSavedPaymentMethod(
    @Args('id', { type: () => ID }) savedPaymentMethodId: number,
  ): Promise<SavedPaymentMethodDto[]> {
    await this.walletService.deletePaymentMethod({
      userId: this.context.req.user.id,
      savedPaymentMethodId,
    });
    return this.savedPaymentMethodRepo.find({
      where: { riderId: this.context.req.user.id },
    }) as unknown as SavedPaymentMethodDto[];
  }

  @Query(() => [PaymentGatewayDTO])
  async paymentGateways(): Promise<PaymentGatewayDTO[]> {
    let result = await this.gatewayRepo.find({
      where: { enabled: true },
    });
    result = result.map((item) => {
      item['linkMethod'] =
        item.type == PaymentGatewayType.Stripe
          ? GatewayLinkMethod.redirect
          : GatewayLinkMethod.none;
      return item;
    });

    return result as unknown as PaymentGatewayDTO[];
  }
}
