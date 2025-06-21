import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module, OnModuleInit } from '@nestjs/common';
import { OperatorRoleEntity } from '@ridy/database';
import { OperatorEntity } from '@ridy/database';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OperatorRoleDTO } from './dto/operator-role.dto';
import { OperatorDTO } from './dto/operator.dto';
import { CreateOperatorInput } from './input/create-operator.input';
import { OperatorService } from './operator.service';
import { OperatorResolver } from './operator.resolver';
import { OperatorRoleInput } from './input/operator-role.input';
import { OperatorSessionEntity } from '@ridy/database';
import { OperatorSessionDTO } from './dto/operator-session.dto';
import { readFile, unlink } from 'fs/promises';
import { UpdateConfigInputV2 } from '../config/dto/update-config.input';
import { OperatorPermission } from '@ridy/database';
import { TaxiPermission } from '@ridy/database';
import { ShopPermission } from '@ridy/database';
import { ParkingPermission } from '@ridy/database';
import { AppType } from 'license-verify';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { existsSync } from 'fs';
import { UpdateOperatorInput } from './input/update-operator.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          OperatorEntity,
          OperatorRoleEntity,
          OperatorSessionEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: OperatorRoleEntity,
          DTOClass: OperatorRoleDTO,
          CreateDTOClass: OperatorRoleInput,
          UpdateDTOClass: OperatorRoleInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.NONE,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: OperatorEntity,
          DTOClass: OperatorDTO,
          CreateDTOClass: CreateOperatorInput,
          UpdateDTOClass: UpdateOperatorInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: OperatorSessionEntity,
          DTOClass: OperatorSessionDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { one: { disabled: true } },
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.NONE,
          enableTotalCount: true,
        },
      ],
    }),
  ],
  providers: [OperatorService, OperatorResolver],
  exports: [OperatorService],
})
export class OperatorModule implements OnModuleInit {
  constructor(
    @InjectRepository(OperatorRoleEntity)
    private readonly operatorRoleRepository: Repository<OperatorRoleEntity>,
    @InjectRepository(OperatorEntity)
    private readonly operatorRepository: Repository<OperatorEntity>,
  ) {}

  async onModuleInit() {
    const operators = await this.operatorRepository.find();
    if (operators.length > 0) {
      return;
    }
    const fileAddress = `${process.cwd()}/config/credentials.json`;
    if (!existsSync(fileAddress)) {
      return;
    }
    const file = await readFile(`${process.cwd()}/config/credentials.json`, {
      encoding: 'utf-8',
    });
    const config: UpdateConfigInputV2 = JSON.parse(file as string);
    // restart AdminApiModule
    const operatorRole = this.operatorRoleRepository.create();
    operatorRole.title = 'Admin';
    operatorRole.permissions = Object.values(OperatorPermission);
    if (config.taxi != null) {
      operatorRole.taxiPermissions = Object.values(TaxiPermission);
    } else {
      operatorRole.taxiPermissions = [];
    }
    if (config.shop) {
      operatorRole.shopPermissions = Object.values(ShopPermission);
    } else {
      operatorRole.shopPermissions = [];
    }
    if (config.parking) {
      operatorRole.parkingPermissions = Object.values(ParkingPermission);
    } else {
      operatorRole.parkingPermissions = [];
    }
    operatorRole.allowedApps = [
      config.taxi ? AppType.Taxi : null,
      config.shop ? AppType.Shop : null,
      config.parking ? AppType.Parking : null,
    ].filter((app) => app != null) as AppType[];
    const role = await this.operatorRoleRepository.save(operatorRole);
    const operator = this.operatorRepository.create();
    operator.email = config.email;
    operator.firstName = config.firstName;
    operator.lastName = config.lastName;
    operator.password = config.password;
    operator.role = role;
    operator.mobileNumber = config.phoneNumber;
    operator.userName = config.email;
    this.operatorRepository.save(operator);
    // delete file
    await unlink(fileAddress);
  }
}
