import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { Float, ID, ObjectType, Field } from '@nestjs/graphql';
import { RiderDeductTransactionType } from '@ridy/database';
import { RiderRechargeTransactionType } from '@ridy/database';
import { TransactionAction } from '@ridy/database';
import { TransactionStatus } from '@ridy/database';

import { OperatorDTO } from '../../operator/dto/operator.dto';
import { PaymentGatewayDTO } from '../../payment-gateway/dto/payment-gateway.dto';
import { CustomerDTO } from './customer.dto';
import { SavedPaymentMethodDTO } from './saved-payment-method.dto';

@ObjectType('RiderTransaction')
@Relation('operator', () => OperatorDTO, { nullable: true })
@Relation('paymentGateway', () => PaymentGatewayDTO, { nullable: true })
@Relation('savedPaymentMethod', () => SavedPaymentMethodDTO, { nullable: true })
@Relation('rider', () => CustomerDTO)
export class RiderTransactionDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField(() => TransactionAction)
  action!: TransactionAction;
  @FilterableField()
  createdAt!: Date;
  @FilterableField(() => RiderDeductTransactionType, { nullable: true })
  deductType?: RiderDeductTransactionType;
  @FilterableField(() => RiderRechargeTransactionType, { nullable: true })
  rechargeType?: RiderRechargeTransactionType;
  @FilterableField(() => TransactionStatus)
  status!: TransactionStatus;
  @FilterableField(() => Float)
  amount!: number;
  @FilterableField(() => String)
  currency!: string;
  @Field(() => String, { nullable: true })
  refrenceNumber?: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @FilterableField(() => ID)
  riderId!: number;
  @FilterableField(() => ID, { nullable: true })
  paymentGatewayId?: number;
  @FilterableField(() => ID, { nullable: true })
  savedPaymentMethodId?: number;
  @FilterableField(() => ID, { nullable: true })
  operatorId?: number;
  @FilterableField(() => ID, { name: 'requestId', nullable: true })
  taxiOrderId?: number;
  @FilterableField(() => ID, { nullable: true })
  shopOrderId?: number;
  @FilterableField(() => ID, { nullable: true })
  parkOrderParkOwnerId?: number;
  @FilterableField(() => ID, { nullable: true })
  parkOrderCustomerId?: number;
}
