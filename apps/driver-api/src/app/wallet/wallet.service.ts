import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentGatewayEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { PaymentGatewayDTO } from './dto/payment-gateway.dto';
import { PaymentGatewayType } from '@ridy/database';
import { GatewayLinkMethod } from '@ridy/database';
import { SavedPaymentMethodEntity } from '@ridy/database';
import { DriverEntity } from '@ridy/database';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(PaymentGatewayEntity)
    private gatewayRepo: Repository<PaymentGatewayEntity>,
    @InjectRepository(SavedPaymentMethodEntity)
    private savedPaymentMethodRepo: Repository<SavedPaymentMethodEntity>,
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
  ) {}

  async getGateways(): Promise<PaymentGatewayDTO[]> {
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

    await this.driverRepository.update(
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
