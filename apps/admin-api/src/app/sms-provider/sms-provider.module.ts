import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { SMSProviderEntity } from '@ridy/database';
import { SMSProviderDTO } from './dto/sms-provider.dto';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SMSProviderService } from './sms-provider.service';
import { SMSProviderResolver } from './sms-provider.resolver';
import { SMSProviderInput } from './dto/sms-provider.input';
import { SMSProviderQueryService } from './sms-provider-query.service';
import { SMSEntity } from '@ridy/database';
import { SMSDTO } from './dto/sms.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([SMSProviderEntity, SMSEntity]),
      ],
      services: [SMSProviderQueryService],
      resolvers: [
        {
          DTOClass: SMSProviderDTO,
          CreateDTOClass: SMSProviderInput,
          UpdateDTOClass: SMSProviderInput,
          EntityClass: SMSProviderEntity,
          ServiceClass: SMSProviderQueryService,
          guards: [JwtAuthGuard],
          read: {
            many: {
              name: 'smsProviders',
            },
            one: {
              name: 'smsProvider',
            },
          },
          delete: {
            many: { disabled: false },
          },
          update: {
            many: { disabled: false },
          },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
        {
          EntityClass: SMSEntity,
          DTOClass: SMSDTO,
          guards: [JwtAuthGuard],
          read: {
            many: {
              name: 'smses',
            },
            one: {
              name: 'sms',
            },
          },
          create: {
            many: { disabled: false },
          },
          update: {
            many: { disabled: false },
          },
          delete: {
            many: { disabled: false },
          },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
      ],
    }),
    TypeOrmModule.forFeature([SMSProviderEntity]),
  ],
  providers: [SMSProviderService, SMSProviderResolver],
})
export class SMSProviderModule {}
