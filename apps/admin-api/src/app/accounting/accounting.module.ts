import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxiOrderEntity } from '@ridy/database';
import { ProviderTransactionEntity } from '@ridy/database';
import { ProviderWalletEntity } from '@ridy/database';

import { AccountingResolver } from './accounting.resolver';
import { AccountingService } from './accounting.service';
import { ProviderTransactionDTO } from './dto/provider-transaction.dto';
import { ProviderWalletDTO } from './dto/provider-wallet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DriverEntity } from '@ridy/database';
import { CustomerEntity } from '@ridy/database';
import { ProviderTransactionInput } from './dto/provider-transaction.input';
import { RiderWalletEntity } from '@ridy/database';
import { DriverWalletEntity } from '@ridy/database';
import { ShopWalletEntity } from '@ridy/database';
import { FleetWalletEntity } from '@ridy/database';
import { ShopTransactionEntity } from '@ridy/database';
import { RiderTransactionEntity } from '@ridy/database';
import { DriverTransactionEntity } from '@ridy/database';
import { FleetTransactionEntity } from '@ridy/database';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProviderTransactionEntity,
      ShopTransactionEntity,
      RiderTransactionEntity,
      DriverTransactionEntity,
      FleetTransactionEntity,
      ProviderWalletEntity,
      RiderWalletEntity,
      DriverWalletEntity,
      ShopWalletEntity,
      FleetWalletEntity,
      TaxiOrderEntity,
      DriverEntity,
      CustomerEntity,
    ]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ProviderTransactionEntity,
          ProviderWalletEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: ProviderTransactionEntity,
          DTOClass: ProviderTransactionDTO,
          CreateDTOClass: ProviderTransactionInput,
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: ProviderWalletEntity,
          DTOClass: ProviderWalletDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
  providers: [AccountingService, AccountingResolver],
})
export class AccountingModule {}
