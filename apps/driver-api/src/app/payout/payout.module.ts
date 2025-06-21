import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayoutAccountEntity } from '@ridy/database';
import { DriverEntity } from '@ridy/database';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { GqlAuthGuard } from '../auth/jwt-gql-auth.guard';
import { PayoutAccountDTO } from './dto/payout-account.dto';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { PayoutService } from './payout.service';
import { PayoutResolver } from './payout.resolver';
import { PaymentGatewayEntity } from '@ridy/database';
import { WalletModule } from '../wallet/wallet.module';
import { PayoutMethodDTO } from './dto/payout-method.dto';
import { PayoutMethodEntity } from '@ridy/database';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([DriverEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        WalletModule,
        NestjsQueryTypeOrmModule.forFeature([
          PayoutAccountEntity,
          PaymentGatewayEntity,
          PayoutMethodEntity,
        ]),
      ],
      resolvers: [
        {
          DTOClass: PayoutAccountDTO,
          EntityClass: PayoutAccountEntity,
          read: { one: { disabled: true } },
          create: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          update: { many: { disabled: true } },
          guards: [GqlAuthGuard],
          pagingStrategy: PagingStrategies.NONE,
        },
        {
          DTOClass: PayoutMethodDTO,
          EntityClass: PayoutMethodEntity,
          read: { one: { disabled: true } },
          create: { disabled: true },
          delete: { disabled: true },
          update: { disabled: true },
          guards: [GqlAuthGuard],
          pagingStrategy: PagingStrategies.NONE,
        },
      ],
    }),
  ],
  providers: [PayoutService, PayoutResolver],
})
export class PayoutModule {}
