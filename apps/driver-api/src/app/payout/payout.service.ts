import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayoutAccountEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { IntentResult, SetupPayoutMethodBody } from '@ridy/database';
import { GqlAuthGuard } from '../auth/jwt-gql-auth.guard';
import { PayoutMethodDTO } from './dto/payout-method.dto';
import { PayoutAccountInput } from './dto/payout-account.input';
import { PayoutMethodEntity } from '@ridy/database';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { UpdatePayoutMethodInput } from './dto/update-payout-method.input';

@Injectable()
@UseGuards(GqlAuthGuard)
export class PayoutService {
  constructor(
    @InjectRepository(PayoutAccountEntity)
    private readonly payoutAccountsRepository: Repository<PayoutAccountEntity>,
    @InjectRepository(PayoutMethodEntity)
    private readonly payoutMethodRepository: Repository<PayoutMethodEntity>,
    private httpService: HttpService,
  ) {}

  async getSupportedPayoutMethods(): Promise<PayoutMethodDTO[]> {
    return [];
    // let paymentGateways: PaymentGatewayDTO[] = (
    //   await this.paymentGatewayRepository.find({
    //     where: { type: In([PaymentGatewayType.Stripe]), enabled: true },
    //   })
    // ).map((item: any) => {
    //   item.linkMethod = GatewayLinkMethod.redirect;
    //   return item;
    // });

    // const redirectMethods = paymentGateways.map((gateway) => ({
    //   id: gateway.id,
    //   name: gateway.title,
    //   type: gateway.type,
    //   linkMethod: GatewayLinkMethod.redirect,
    //   paymentGateway: gateway,
    // }));
    // return [
    //   ...redirectMethods,
    //   {
    //     id: 0,
    //     name: 'Bank Transfer',
    //     linkMethod: GatewayLinkMethod.manual,
    //   },
    // ];
  }

  async getPayoutLinkUrl(input: {
    driverId: number;
    payoutMethodId: number;
  }): Promise<IntentResult> {
    const apiBody: SetupPayoutMethodBody = {
      userType: 'driver',
      driverId: input.driverId,
      payoutMethodId: input.payoutMethodId,
      returnUrl: `${
        process.env.DRIVER_APPLICATION_ID ?? 'default.driver.redirection'
      }://`,
    };
    const payoutIntentResult = await firstValueFrom(
      this.httpService.post<IntentResult>(
        `${process.env.GATEWAY_SERVER_URL}/get_payout_link_url`,
        apiBody,
      ),
    );
    return payoutIntentResult.data;
  }

  async markPayoutAccountAsDefault(input: {
    payoutMethodId: number;
    driverId: number;
  }): Promise<PayoutAccountEntity> {
    const payoutAccount = await this.payoutAccountsRepository.findOneOrFail({
      where: { id: input.payoutMethodId, driverId: input.driverId },
    });

    await this.payoutAccountsRepository.update(
      { driverId: input.driverId },
      { isDefault: false },
    );

    payoutAccount.isDefault = true;

    return this.payoutAccountsRepository.save(payoutAccount);
  }

  async createPayoutAccount(
    input: PayoutAccountInput & { driverId: number },
  ): Promise<PayoutAccountEntity> {
    await this.payoutAccountsRepository.update(
      { driverId: input.driverId },
      { isDefault: false },
    );
    const payoutMethod = await this.payoutMethodRepository.findOneOrFail({
      where: { id: input.payoutMethodId },
    });
    const payoutAccount = this.payoutAccountsRepository.create({
      ...input,
      driverId: input.driverId,
      last4: input.accountNumber.slice(-4),
      currency: payoutMethod.currency,
      isDefault: true,
      name: input.bankName + ' ' + input.accountNumber.slice(-4),
    });

    return this.payoutAccountsRepository.save(payoutAccount);
  }

  async updatePayoutMethod(
    input: UpdatePayoutMethodInput & { driverId: number },
  ): Promise<PayoutAccountEntity> {
    const payoutAccount = await this.payoutAccountsRepository.findOneOrFail({
      where: { id: input.id, driverId: input.driverId },
    });

    if (input.isDefault) {
      await this.payoutAccountsRepository.update(
        { driverId: input.driverId },
        { isDefault: false },
      );
    }

    payoutAccount.isDefault = input.isDefault;

    return this.payoutAccountsRepository.save(payoutAccount);
  }
}
