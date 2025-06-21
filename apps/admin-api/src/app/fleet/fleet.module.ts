import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { FleetTransactionEntity } from '@ridy/database';
import { FleetWalletEntity } from '@ridy/database';
import { FleetEntity } from '@ridy/database';
import { SharedFleetService } from '@ridy/database';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FleetTransactionDTO } from './dto/fleet-transaction.dto';
import { FleetWalletDTO } from './dto/fleet-wallet.dto';
import { FleetDTO } from './dto/fleet.dto';
import { FleetResolver } from './fleet.resolver';
import { CreateFleetInput } from './inputs/create-fleet.input';
import { FleetStaffEntity } from '@ridy/database';
import { FleetStaffSessionDTO } from './dto/fleet-staff-session.dto';
import { FleetStaffSessionEntity } from '@ridy/database';
import { FleetStaffDTO } from './dto/fleet-staff.dto';
import { CreateFleetStaffInput } from './inputs/create-fleet-staff.input';
import { UpdateFleetStaffInput } from './inputs/update-fleet-staff.input';
import { FleetService } from './fleet.service';
import { UpdateFleetInput } from './inputs/update-fleet.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          FleetEntity,
          FleetTransactionEntity,
          FleetWalletEntity,
          FleetStaffEntity,
          FleetStaffSessionEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: FleetEntity,
          DTOClass: FleetDTO,
          CreateDTOClass: CreateFleetInput,
          UpdateDTOClass: UpdateFleetInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: FleetWalletEntity,
          DTOClass: FleetWalletDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: FleetTransactionEntity,
          DTOClass: FleetTransactionDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: FleetStaffEntity,
          DTOClass: FleetStaffDTO,
          CreateDTOClass: CreateFleetStaffInput,
          UpdateDTOClass: UpdateFleetStaffInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
        {
          EntityClass: FleetStaffSessionEntity,
          DTOClass: FleetStaffSessionDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
          enableTotalCount: true,
        },
      ],
    }),
  ],
  providers: [FleetResolver, SharedFleetService, FleetService],
})
export class FleetModule {}
