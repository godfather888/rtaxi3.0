import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { RiderAddressEntity } from '@ridy/database';

import { GqlAuthGuard } from '../auth/access-token.guard';
import { CreateRiderAddressInput } from './dto/create-rider-address.input';
import { RiderAddressDTO } from './dto/rider-address.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([RiderAddressEntity])],
      resolvers: [
        {
          EntityClass: RiderAddressEntity,
          DTOClass: RiderAddressDTO,
          CreateDTOClass: CreateRiderAddressInput,
          UpdateDTOClass: CreateRiderAddressInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          guards: [GqlAuthGuard],
          pagingStrategy: PagingStrategies.NONE,
        },
      ],
    }),
  ],
})
export class AddressModule {}
