import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { PayoutMethodDTO } from './dto/payout-method.dto';
import { PayoutMethodEntity } from '@ridy/database';
import { CreatePayoutMethodInput } from './dto/create-payout-method.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PayoutAccountDTO } from './dto/payout-account.dto';
import { PayoutAccountEntity } from '@ridy/database';
import { PayoutService } from './payout.service';
import { PayoutResolver } from './payout.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from '@ridy/database';
import { DriverWalletEntity } from '@ridy/database';
import { DriverTransactionEntity } from '@ridy/database';
import { OperatorModule } from '../operator/operator.module';
import { ShopTransactionEntity } from '@ridy/database';
import { ParkingTransactionEntity } from '@ridy/database';
import { ShopWalletEntity } from '@ridy/database';
import { ParkingWalletEntity } from '@ridy/database';
import { TaxiPayoutModule } from './modules/taxi/taxi-payout.module';
import { ShopPayoutModule } from './modules/shop/shop-payout.module';
import { ParkingPayoutModule } from './modules/parking/parking-payout.module';

@Module({
  imports: [
    OperatorModule,
    TaxiPayoutModule,
    ShopPayoutModule,
    ParkingPayoutModule,
    TypeOrmModule.forFeature([
      RegionEntity,
      DriverWalletEntity,
      DriverTransactionEntity,
      ShopWalletEntity,
      ParkingWalletEntity,
      ShopTransactionEntity,
      ParkingTransactionEntity,
    ]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          PayoutMethodEntity,
          PayoutAccountEntity,
        ]),
      ],
      resolvers: [
        {
          DTOClass: PayoutMethodDTO,
          EntityClass: PayoutMethodEntity,
          CreateDTOClass: CreatePayoutMethodInput,
          UpdateDTOClass: CreatePayoutMethodInput,
          guards: [JwtAuthGuard],
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          enableTotalCount: true,
          pagingStrategy: PagingStrategies.OFFSET,
        },
        {
          DTOClass: PayoutAccountDTO,
          EntityClass: PayoutAccountEntity,
          read: { many: { disabled: true } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
  providers: [PayoutService, PayoutResolver],
})
export class PayoutModule {}
