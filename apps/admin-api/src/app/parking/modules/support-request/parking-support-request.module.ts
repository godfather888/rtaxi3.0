import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ParkingSupportRequestActivityEntity } from '@ridy/database';
import { ParkingSupportRequestEntity } from '@ridy/database';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { ParkingSupportRequestDTO } from './dto/parking-support-request.dto';
import { ParkingSupportRequestActivityDTO } from './dto/parking-support-request-activity.dto';
import { ParkingSupportRequestService } from './parking-support-request.service';
import { ParkingSupportRequestResolver } from './parking-support-request.resolver';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ParkingSupportRequestEntity,
          ParkingSupportRequestActivityEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: ParkingSupportRequestEntity,
          DTOClass: ParkingSupportRequestDTO,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          enableAggregate: true,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: ParkingSupportRequestActivityEntity,
          DTOClass: ParkingSupportRequestActivityDTO,
          pagingStrategy: PagingStrategies.NONE,
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
  providers: [ParkingSupportRequestService, ParkingSupportRequestResolver],
})
export class ParkingSupportRequestModule {}
