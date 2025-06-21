import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonCouponModule } from '@ridy/database';

import { CouponEntity } from '@ridy/database';
import { PaymentEntity } from '@ridy/database';
import { TaxiOrderEntity } from '@ridy/database';
import { SharedOrderModule } from '@ridy/database';
import { OrderModule } from '../order/order.module';
import { CouponResolver } from './coupon.resolver';
import { CouponService } from './coupon.service';
import { SharedCustomerWalletModule } from '@ridy/database';

@Module({
  imports: [
    forwardRef(() => OrderModule),
    SharedOrderModule,
    CommonCouponModule,
    TypeOrmModule.forFeature([TaxiOrderEntity, CouponEntity, PaymentEntity]),
    // NestjsQueryGraphQLModule.forFeature({
    //   imports: [NestjsQueryTypeOrmModule.forFeature([CouponEntity])],
    //   resolvers: [
    //     {
    //       EntityClass: CouponEntity,
    //       DTOClass: CouponDTO,
    //       create: { disabled: true },
    //       read: { disabled: true },
    //       delete: { disabled: true },
    //       update: { disabled: true },
    //       guards: [GqlAuthGuard],
    //       pagingStrategy: PagingStrategies.NONE,
    //     },
    //   ],
    // }),
  ],
  providers: [CouponService, CouponResolver],
  exports: [CouponService],
})
export class CouponModule {}
