import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { CustomerEntity } from '@ridy/database';
import { RiderDTO } from './dto/rider.dto';
import { UpdateRiderInput } from './dto/update-rider.input';
import { GqlAuthGuard } from '../auth/access-token.guard';
import { RiderWalletEntity } from '@ridy/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedRiderService } from '@ridy/database';
import { RiderTransactionEntity } from '@ridy/database';
import { DriverEntity } from '@ridy/database';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEntity,
      DriverEntity,
      RiderWalletEntity,
      RiderTransactionEntity,
    ]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([CustomerEntity])],
      resolvers: [
        {
          EntityClass: CustomerEntity,
          DTOClass: RiderDTO,
          UpdateDTOClass: UpdateRiderInput,
          read: { many: { disabled: true } },
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
      ],
    }),
  ],
  providers: [SharedRiderService],
  exports: [SharedRiderService],
})
export class RiderModule {}
