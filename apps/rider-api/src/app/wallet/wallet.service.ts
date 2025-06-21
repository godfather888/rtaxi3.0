import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMode } from '@ridy/database';
import { PaymentGatewayEntity } from '@ridy/database';
import { SavedPaymentMethodEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  ChargeSavedPaymentMethodBody,
  GetPaymentLinkBody,
  IntentResult,
} from '@ridy/database';
import { CustomerEntity } from '@ridy/database';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(PaymentGatewayEntity)
    private gatewayRepo: Repository<PaymentGatewayEntity>,
    @InjectRepository(SavedPaymentMethodEntity)
    private savedPaymentMethodRepo: Repository<SavedPaymentMethodEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
    private httpService: HttpService,
  ) {}

  async getPaymentLink(input: GetLinkInput): Promise<IntentResult> {
    if (input.paymentMode === PaymentMode.PaymentGateway) {
      const link = await this.getLinkForPaymentGateway(input);
      return link;
    } else if (input.paymentMode == PaymentMode.SavedPaymentMethod) {
      const link = await this.chargeSavedPaymentMethod(input);
      return link;
    }
  }

  async getSavedPaymentMethods(input: {
    userId: number;
  }): Promise<SavedPaymentMethodEntity[]> {
    const defaultSavedPaymentMethod = await this.customerRepository.findOne({
      where: { id: input.userId },
    });
    const savedPaymentMethods = await this.savedPaymentMethodRepo.find({
      where: {
        riderId: input.userId,
        isEnabled: true,
      },
      order: {
        isDefault: 'DESC',
      },
    });
    if (defaultSavedPaymentMethod?.defaultSavedPaymentMethodId) {
      const defaultPaymentMethod = savedPaymentMethods.findIndex(
        (method) =>
          method.id === defaultSavedPaymentMethod.defaultSavedPaymentMethodId,
      );
      // set all other payment methods to false
      savedPaymentMethods.forEach((method) => {
        method.isDefault = false;
      });
      if (defaultPaymentMethod >= 0) {
        savedPaymentMethods[defaultPaymentMethod].isDefault = true;
      }
    }
    return savedPaymentMethods;
  }

  private async getLinkForPaymentGateway(
    input: GetLinkInput,
  ): Promise<IntentResult> {
    await this.gatewayRepo.findOneByOrFail({
      id: input.gatewayId,
    });
    const body: GetPaymentLinkBody = {
      userId: input.userId.toString(),
      userType: 'rider',
      paymentGatewayId: input.gatewayId,
      amount: input.amount.toString(),
      currency: input.currency,
      orderNumber: input.orderNumber,
      shouldPreauth: input.shouldPreauth == true ? '1' : '0',
      returnUrl: `${process.env.RIDER_SERVER_URL}/payment_result`,
    };
    const result = await firstValueFrom(
      this.httpService.post<IntentResult>(
        `${process.env.GATEWAY_SERVER_URL}/create_payment_link`,
        body,
      ),
    );

    return {
      status: result.data.status,
      url: result.data.url,
    };
  }

  private async chargeSavedPaymentMethod(
    input: GetLinkInput,
  ): Promise<IntentResult> {
    const savedPaymentMethod =
      await this.savedPaymentMethodRepo.findOneByOrFail({
        id: input.gatewayId,
      });
    const body: ChargeSavedPaymentMethodBody = {
      userId: input.userId.toString(),
      userType: 'rider',
      savedPaymentMethodId: savedPaymentMethod.id.toString(),
      amount: input.amount,
      currency: input.currency,
      orderNumber: input.orderNumber,
      returnUrl: `${process.env.RIDER_SERVER_URL}/saved_payment_method_charged`,
    };
    const result = await firstValueFrom(
      this.httpService.post<IntentResult>(
        `${process.env.GATEWAY_SERVER_URL}/charge_saved_payment_method`,
        body,
      ),
    );
    return result.data;
  }

  async markPaymentMethodAsDefault(input: {
    userId: number;
    savedPaymentMethodId: number;
  }) {
    await this.savedPaymentMethodRepo.findOneByOrFail({
      id: input.savedPaymentMethodId,
      riderId: input.userId,
    });
    await this.savedPaymentMethodRepo.update(
      { riderId: input.userId },
      { isDefault: false },
    );
    await this.savedPaymentMethodRepo.update(
      { id: input.savedPaymentMethodId },
      { isDefault: true },
    );

    await this.customerRepository.update(
      { id: input.userId },
      { defaultSavedPaymentMethodId: input.savedPaymentMethodId },
    );
  }

  deletePaymentMethod(input: { userId: number; savedPaymentMethodId: number }) {
    return this.savedPaymentMethodRepo.delete({
      id: input.savedPaymentMethodId,
      riderId: input.userId,
    });
  }
}

interface GetLinkInput {
  paymentMode: PaymentMode;
  gatewayId: number;
  userId: number;
  amount: number;
  currency: string;
  orderNumber: string;
  shouldPreauth?: boolean;
}
