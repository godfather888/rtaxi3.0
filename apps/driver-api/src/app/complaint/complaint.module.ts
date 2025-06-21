import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { TaxiSupportRequestEntity } from '@ridy/database';
import { GqlAuthGuard } from '../auth/jwt-gql-auth.guard';
import { ComplaintDTO } from './dto/complaint.dto';
import { ComplaintInput } from './dto/complaint.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([TaxiSupportRequestEntity]),
      ],
      resolvers: [
        {
          EntityClass: TaxiSupportRequestEntity,
          DTOClass: ComplaintDTO,
          CreateDTOClass: ComplaintInput,
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
