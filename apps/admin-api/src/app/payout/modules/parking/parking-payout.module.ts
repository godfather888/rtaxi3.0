import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingPayoutSessionEntity } from '@ridy/database';
import { ParkingPayoutService } from './parking-payout.service';
import { ParkingPayoutResolver } from './parking-payout.resolver';
import { OperatorModule } from '../../../operator/operator.module';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { ParkingPayoutSessionPayoutMethodDetailEntity } from '@ridy/database';
import { ParkingPayoutSessionPayoutMethodDetailDTO } from './dto/parking-payout-session-payout-method-detail.dto';
import { ParkingPayoutSessionDTO } from './dto/parking-payout-session.dto';
import { UpdatePayoutSessionInput } from '../../dto/update-payout-session.input';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ParkingTransactionEntity } from '@ridy/database';
import { ParkingWalletEntity } from '@ridy/database';

@Module({
  imports: [
    OperatorModule,
    TypeOrmModule.forFeature([
      ParkingPayoutSessionEntity,
      ParkingTransactionEntity,
      ParkingWalletEntity,
    ]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ParkingPayoutSessionEntity,
          ParkingPayoutSessionPayoutMethodDetailEntity,
        ]),
      ],
      resolvers: [
        {
          DTOClass: ParkingPayoutSessionDTO,
          EntityClass: ParkingPayoutSessionEntity,
          UpdateDTOClass: UpdatePayoutSessionInput,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
        {
          DTOClass: ParkingPayoutSessionPayoutMethodDetailDTO,
          EntityClass: ParkingPayoutSessionPayoutMethodDetailEntity,
          read: { disabled: true },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
      ],
    }),
  ],
  providers: [ParkingPayoutService, ParkingPayoutResolver],
  exports: [ParkingPayoutResolver],
})
export class ParkingPayoutModule {}
