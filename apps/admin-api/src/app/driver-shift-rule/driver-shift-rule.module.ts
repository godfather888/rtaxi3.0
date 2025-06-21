import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { DriverShiftRuleEntity } from '@ridy/database';
import { DriverShiftRuleDTO } from './dto/driver-shift-rule.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DriverShiftRuleInput } from './dto/driver-shift-rule.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([DriverShiftRuleEntity])],
      resolvers: [
        {
          DTOClass: DriverShiftRuleDTO,
          EntityClass: DriverShiftRuleEntity,
          CreateDTOClass: DriverShiftRuleInput,
          UpdateDTOClass: DriverShiftRuleInput,
          pagingStrategy: PagingStrategies.NONE,
          read: { one: { disabled: true } },
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
})
export class DriverShiftRuleModule {}
