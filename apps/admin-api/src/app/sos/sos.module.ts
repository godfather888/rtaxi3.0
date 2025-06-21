import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { RedisPubSubProvider } from '@ridy/database';
import { SOSActivityEntity } from '@ridy/database';
import { SOSEntity } from '@ridy/database';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSOSAcitivtyInput } from './dto/create-sos-activity.input';
import { SOSActivityDTO } from './dto/sos-activity.dto';
import { SOSDTO } from './dto/sos.dto';
import { SOSActivityQueryService } from './sos-acitivty-query.service';
import { SOSSubscriptionService } from './sos-subscription.service';
import { SOSReasonEntity } from '@ridy/database';
import { SOSReasonDTO } from './dto/sos-reason.dto';
import { CreateSosReasonInput } from './dto/create-sos-reason.input';
import { UpdateSosReasonInput } from './dto/update-sos-reason.input';
import { UpdateSosInput } from './dto/update-sos.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          SOSEntity,
          SOSActivityEntity,
          SOSReasonEntity,
        ]),
      ],
      services: [SOSActivityQueryService],
      resolvers: [
        {
          EntityClass: SOSEntity,
          DTOClass: SOSDTO,
          UpdateDTOClass: UpdateSosInput,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: SOSActivityEntity,
          DTOClass: SOSActivityDTO,
          CreateDTOClass: CreateSOSAcitivtyInput,
          ServiceClass: SOSActivityQueryService,
          read: { disabled: true },
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: SOSReasonEntity,
          DTOClass: SOSReasonDTO,
          CreateDTOClass: CreateSosReasonInput,
          UpdateDTOClass: UpdateSosReasonInput,
          guards: [JwtAuthGuard],
          read: { one: { name: 'sosReason' }, many: { name: 'sosReasons' } },
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
      ],
    }),
  ],
  providers: [SOSSubscriptionService, RedisPubSubProvider.provider()],
})
export class SOSModule {}
