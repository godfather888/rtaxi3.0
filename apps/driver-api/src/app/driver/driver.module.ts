import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from "@ptc-org/nestjs-query-graphql";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DriverEntity } from "@ridy/database";
import { DriverService } from "./driver.service";
import { DriverDTO } from "./dto/driver.dto";
import { NestjsQueryTypeOrmModule } from "@ptc-org/nestjs-query-typeorm";
import { CarModelDTO } from "./dto/car-model.dto";
import { CarModelEntity } from "@ridy/database";
import { CarColorDTO } from "./dto/car-color.dto";
import { CarColorEntity } from "@ridy/database";
import { GqlAuthGuard } from "../auth/jwt-gql-auth.guard";
import { RedisHelpersModule } from "@ridy/database";
import { UploadModule } from "../upload/upload.module";
import { MediaEntity } from "@ridy/database";
import { DriverQueryService } from "./driver-query.service";
import { ServiceEntity } from "@ridy/database";
import { UpdateDriverInput } from "./dto/update-driver.input";
import { DriverServicesServiceEntity } from "@ridy/database";
import { DriverServicesServiceDTO } from "./dto/driver-services-service.dto";
import { DriverResolver } from "./driver.resolver";

@Module({
  imports: [
    RedisHelpersModule,
    UploadModule,
    TypeOrmModule.forFeature([DriverEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        RedisHelpersModule,
        NestjsQueryTypeOrmModule.forFeature([
          DriverEntity,
          CarModelEntity,
          CarColorEntity,
          MediaEntity,
          ServiceEntity,
          DriverServicesServiceEntity,
        ]),
      ],
      services: [DriverQueryService],
      resolvers: [
        {
          EntityClass: DriverEntity,
          DTOClass: DriverDTO,
          ServiceClass: DriverQueryService,
          UpdateDTOClass: UpdateDriverInput,
          read: { many: { disabled: true } },
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
        {
          EntityClass: CarModelEntity,
          DTOClass: CarModelDTO,
          create: { disabled: true },
          read: { one: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
        },
        {
          EntityClass: CarColorEntity,
          DTOClass: CarColorDTO,
          create: { disabled: true },
          read: { one: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
        },
        {
          EntityClass: DriverServicesServiceEntity,
          DTOClass: DriverServicesServiceDTO,
          pagingStrategy: PagingStrategies.NONE,
          create: { disabled: true },
          read: { one: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
      ],
    }),
  ],
  providers: [DriverService, DriverQueryService, DriverResolver],
  exports: [DriverService, DriverQueryService, DriverResolver],
})
export class DriverModule {}
