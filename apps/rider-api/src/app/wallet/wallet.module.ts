import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { PaymentGatewayEntity } from '@ridy/database';
import { RiderTransactionEntity } from '@ridy/database';
import { RiderWalletEntity } from '@ridy/database';
import { GqlAuthGuard } from '../auth/access-token.guard';
import { PaymentGatewayDTO } from './dto/payment-gateway.dto';
import { RiderTransactionDTO } from './dto/rider-transaction.dto';
import { RiderWalletDTO } from './dto/rider-wallet.dto';
import { WalletResolver } from './wallet-resolver';
import { CryptoService } from '@ridy/database';
import { HttpModule } from '@nestjs/axios';
import { SavedPaymentMethodEntity } from '@ridy/database';
import { SavedPaymentMethodDto } from './dto/saved-payment-method.dto';
import { WalletService } from './wallet.service';
import { CommonCouponModule } from '@ridy/database';
import { CustomerEntity } from '@ridy/database';

@Module({
  imports: [
    HttpModule,
    CommonCouponModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          RiderTransactionEntity,
          RiderWalletEntity,
          PaymentGatewayEntity,
          SavedPaymentMethodEntity,
          CustomerEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: RiderTransactionEntity,
          DTOClass: RiderTransactionDTO,
          read: { one: { disabled: true } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
        {
          EntityClass: RiderWalletEntity,
          DTOClass: RiderWalletDTO,
          read: { one: { disabled: true } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
          pagingStrategy: PagingStrategies.NONE,
        },
        {
          EntityClass: PaymentGatewayEntity,
          DTOClass: PaymentGatewayDTO,
          read: { disabled: true },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
        },
        {
          EntityClass: SavedPaymentMethodEntity,
          DTOClass: SavedPaymentMethodDto,
          read: { disabled: true },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
          guards: [GqlAuthGuard],
        },
      ],
    }),
  ],
  providers: [WalletResolver, WalletService, CryptoService],
})
export class WalletModule {}
