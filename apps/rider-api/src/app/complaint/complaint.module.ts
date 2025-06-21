import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { RedisPubSubProvider } from '@ridy/database';
import { TaxiSupportRequestEntity } from '@ridy/database';
import { OperatorEntity } from '@ridy/database';
import { GqlAuthGuard } from '../auth/access-token.guard';
import { ComplaintQueryService } from './complaint-query.service';
import { ComplaintDTO } from './dto/complaint.dto';
import { ComplaintInput } from './dto/complaint.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          TaxiSupportRequestEntity,
          OperatorEntity,
        ]),
      ],
      services: [ComplaintQueryService],
      pubSub: RedisPubSubProvider.provider(),
      resolvers: [
        {
          EntityClass: TaxiSupportRequestEntity,
          DTOClass: ComplaintDTO,
          CreateDTOClass: ComplaintInput,
          ServiceClass: ComplaintQueryService,
          read: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          create: { many: { disabled: true } },
          guards: [GqlAuthGuard],
        },
      ],
    }),
  ],
})
export class ComplaintModule {}
