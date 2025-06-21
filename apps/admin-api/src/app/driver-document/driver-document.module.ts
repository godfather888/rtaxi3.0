import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { DriverDocumentEntity } from '@ridy/database';
import { DriverDocumentRetentionPolicyEntity } from '@ridy/database';
import { DriverDocumentDTO } from './dto/driver-document.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DriverDocumentRetentionPolicyDTO } from './dto/driver-document-retention-policy.dto';
import { DriverDocumentInput } from './dto/driver-document.input';
import { DriverDocumentRetentionPolicyInput } from './dto/driver-document-retention-policy.input';
import { DriverToDriverDocumentEntity } from '@ridy/database';
import { DriverToDriverDocumentDTO } from './dto/driver-to-driver-document.dto';
import { DriverToDriverDocumentInput } from './dto/driver-to-driver-document.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          DriverDocumentEntity,
          DriverToDriverDocumentEntity,
          DriverDocumentRetentionPolicyEntity,
        ]),
      ],
      resolvers: [
        {
          DTOClass: DriverDocumentDTO,
          EntityClass: DriverDocumentEntity,
          CreateDTOClass: DriverDocumentInput,
          UpdateDTOClass: DriverDocumentInput,
          pagingStrategy: PagingStrategies.NONE,
          read: { one: { disabled: true } },
          guards: [JwtAuthGuard],
        },
        {
          DTOClass: DriverDocumentRetentionPolicyDTO,
          EntityClass: DriverDocumentRetentionPolicyEntity,
          CreateDTOClass: DriverDocumentRetentionPolicyInput,
          UpdateDTOClass: DriverDocumentRetentionPolicyInput,
          read: { one: { disabled: true } },
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: DriverToDriverDocumentEntity,
          DTOClass: DriverToDriverDocumentDTO,
          CreateDTOClass: DriverToDriverDocumentInput,
          UpdateDTOClass: DriverToDriverDocumentInput,
          guards: [JwtAuthGuard],
          read: { one: { disabled: true } },
          delete: { many: { disabled: true } },
          update: { many: { disabled: true } },
          create: { many: { disabled: true } },
        },
      ],
    }),
  ],
})
export class DriverDocumentModule {}
