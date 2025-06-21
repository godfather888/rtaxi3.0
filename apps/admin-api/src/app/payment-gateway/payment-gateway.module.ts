import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { PaymentGatewayEntity } from '@ridy/database';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaymentGatewayDTO } from './dto/payment-gateway.dto';
import { CreatePaymentGatewayInput } from './dto/create-payment-gateway.input';
import { UpdatePaymentGatewayInput } from './dto/update-payment-gateway.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([PaymentGatewayEntity])],
      resolvers: [
        {
          EntityClass: PaymentGatewayEntity,
          DTOClass: PaymentGatewayDTO,
          CreateDTOClass: CreatePaymentGatewayInput,
          UpdateDTOClass: UpdatePaymentGatewayInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
})
export class PaymentGatewayModule {}
