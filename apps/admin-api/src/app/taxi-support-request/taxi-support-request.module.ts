import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { RedisPubSubProvider } from '@ridy/database';
import { TaxiSupportRequestActivityEntity } from '@ridy/database';
import { TaxiSupportRequestEntity } from '@ridy/database';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ComplaintSubscriptionService } from './complaint-subscription.service';
import { TaxiSupportRequestActivityDTO } from './dto/taxi-support-request-activity.dto';
import { TaxiSupportRequestDTO } from './dto/taxi-support-request.dto';
import { TaxiSupportRequestResolver } from './taxi-support-request.resolver';
import { TaxiSupportRequestService } from './taxi-support-request.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          TaxiSupportRequestEntity,
          TaxiSupportRequestActivityEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: TaxiSupportRequestEntity,
          DTOClass: TaxiSupportRequestDTO,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          enableAggregate: true,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: TaxiSupportRequestActivityEntity,
          DTOClass: TaxiSupportRequestActivityDTO,
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
  providers: [
    ComplaintSubscriptionService,
    RedisPubSubProvider.provider(),
    TaxiSupportRequestResolver,
    TaxiSupportRequestService,
  ],
})
export class ComplaintModule {}
