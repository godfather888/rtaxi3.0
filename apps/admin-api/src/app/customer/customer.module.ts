import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { RiderAddressEntity } from '@ridy/database';
import { CustomerEntity } from '@ridy/database';
import { RiderTransactionEntity } from '@ridy/database';
import { RiderWalletEntity } from '@ridy/database';
import { SharedRiderService } from '@ridy/database';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RiderAddressDTO } from './dto/rider-address.dto';

import { RiderTransactionDTO } from './dto/rider-transaction.dto';
import { RiderWalletDTO } from './dto/rider-wallet.dto';
import { CustomerDTO } from './dto/customer.dto';
import { RiderResolver } from './customer.resolver';
import { RiderInput } from './dto/rider.input';
import { DriverEntity } from '@ridy/database';
import { SavedPaymentMethodEntity } from '@ridy/database';
import { SavedPaymentMethodDTO } from './dto/saved-payment-method.dto';
import { CustomerSessionEntity } from '@ridy/database';
import { CustomerNoteEntity } from '@ridy/database';
import { CustomerNoteDTO } from './dto/customer-note.dto';
import { CreateCustomerNoteInput } from './dto/create-customer-note.input';
import { RiderTransactionInput } from './dto/rider-transaction.input';
import { CustomerSessionDTO } from './dto/customer-session.dto';
import { CustomerService } from './customer.service';
import { SharedCustomerWalletModule } from '@ridy/database';

@Module({
  imports: [
    SharedCustomerWalletModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          CustomerEntity,
          CustomerNoteEntity,
          CustomerSessionEntity,
          DriverEntity,
          RiderWalletEntity,
          RiderTransactionEntity,
          RiderAddressEntity,
          SavedPaymentMethodEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: CustomerEntity,
          DTOClass: CustomerDTO,
          CreateDTOClass: RiderInput,
          UpdateDTOClass: RiderInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: RiderWalletEntity,
          DTOClass: RiderWalletDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
          enableAggregate: true,
        },
        {
          EntityClass: RiderTransactionEntity,
          DTOClass: RiderTransactionDTO,
          CreateDTOClass: RiderTransactionInput,
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: RiderAddressEntity,
          DTOClass: RiderAddressDTO,
          create: { many: { disabled: true } },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: SavedPaymentMethodEntity,
          DTOClass: SavedPaymentMethodDTO,
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          read: { one: { disabled: true } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { many: { disabled: true } },
        },
        {
          EntityClass: CustomerNoteEntity,
          DTOClass: CustomerNoteDTO,
          CreateDTOClass: CreateCustomerNoteInput,
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.NONE,
          read: { one: { disabled: true } },
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
        },
        {
          EntityClass: CustomerSessionEntity,
          DTOClass: CustomerSessionDTO,
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.NONE,
          enableTotalCount: true,
          read: { one: { disabled: true } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { many: { disabled: true } },
        },
      ],
    }),
  ],
  providers: [RiderResolver, SharedRiderService, CustomerService],
})
export class CustomerModule {}
