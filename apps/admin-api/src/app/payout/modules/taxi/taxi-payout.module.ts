import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverTransactionEntity } from '@ridy/database';
import { TaxiPayoutSessionEntity } from '@ridy/database';
import { DriverWalletEntity } from '@ridy/database';
import { TaxiPayoutService } from './taxi-payout.service';
import { TaxiPayoutResolver } from './taxi-payout.resolver';
import { OperatorModule } from '../../../operator/operator.module';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { TaxiPayoutSessionPayoutMethodDetailEntity } from '@ridy/database';
import { TaxiPayoutSessionPayoutMethodDetailDTO } from './dto/taxi-payout-session-payout-method-detail.dto';
import { TaxiPayoutSessionDTO } from './dto/taxi-payout-session.dto';
import { UpdatePayoutSessionInput } from '../../dto/update-payout-session.input';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { PayoutMethodEntity } from '@ridy/database';
import { RegionEntity } from '@ridy/database';

@Module({
  imports: [
    OperatorModule,
    TypeOrmModule.forFeature([
      TaxiPayoutSessionEntity,
      DriverTransactionEntity,
      DriverWalletEntity,
      RegionEntity,
      PayoutMethodEntity,
    ]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          TaxiPayoutSessionEntity,
          TaxiPayoutSessionPayoutMethodDetailEntity,
        ]),
      ],
      resolvers: [
        {
          DTOClass: TaxiPayoutSessionDTO,
          EntityClass: TaxiPayoutSessionEntity,
          UpdateDTOClass: UpdatePayoutSessionInput,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
        {
          DTOClass: TaxiPayoutSessionPayoutMethodDetailDTO,
          EntityClass: TaxiPayoutSessionPayoutMethodDetailEntity,
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
  providers: [TaxiPayoutService, TaxiPayoutResolver],
  exports: [TaxiPayoutResolver],
})
export class TaxiPayoutModule {}
