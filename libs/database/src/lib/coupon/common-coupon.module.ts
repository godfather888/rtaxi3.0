import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponEntity } from '../entities/coupon.entity';
import { TaxiOrderEntity } from '../entities/taxi/taxi-order.entity';

import { CommonCouponService } from './common-coupon.service';
import { CommonGiftCardService } from './common-gift-card.service';
import { GiftCodeEntity } from '../entities/gift-code.entity';
import { SharedRiderService } from '../order/shared-rider.service';
import { SharedDriverService } from '../order/shared-driver.service';
import { CustomerEntity } from '../entities/customer.entity';
import { DriverEntity } from '../entities/taxi/driver.entity';
import { RiderWalletEntity } from '../entities/rider-wallet.entity';
import { DriverWalletEntity } from '../entities/taxi/driver-wallet.entity';
import { RiderTransactionEntity } from '../entities/rider-transaction.entity';
import { DriverTransactionEntity } from '../entities/taxi/driver-transaction.entity';
import { SharedCustomerWalletModule } from '../customer-wallet';

@Module({
  imports: [
    SharedCustomerWalletModule,
    TypeOrmModule.forFeature([
      TaxiOrderEntity,
      CustomerEntity,
      DriverEntity,
      CouponEntity,
      RiderWalletEntity,
      DriverWalletEntity,
      RiderTransactionEntity,
      DriverTransactionEntity,
      GiftCodeEntity,
    ]),
  ],
  providers: [
    CommonCouponService,
    CommonGiftCardService,
    SharedRiderService,
    SharedDriverService,
  ],
  exports: [CommonCouponService, CommonGiftCardService],
})
export class CommonCouponModule {}
