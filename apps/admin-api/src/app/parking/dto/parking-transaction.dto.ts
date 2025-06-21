import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { TransactionStatus } from '@ridy/database';
import { TransactionType } from '@ridy/database';
import { ParkingTransactionCreditType } from '@ridy/database';
import { ParkingTransactionDebitType } from '@ridy/database';
import { CustomerDTO } from '../../customer/dto/customer.dto';
import { SavedPaymentMethodDTO } from '../../customer/dto/saved-payment-method.dto';
import { PaymentGatewayDTO } from '../../payment-gateway/dto/payment-gateway.dto';
import { OperatorDTO } from '../../operator/dto/operator.dto';
import { PayoutAccountDTO } from '../../payout/dto/payout-account.dto';
import { PayoutMethodDTO } from '../../payout/dto/payout-method.dto';

@ObjectType('ParkingTransaction')
@Relation('staff', () => OperatorDTO, { nullable: true })
@Relation('payoutAccount', () => PayoutAccountDTO, {
  nullable: true,
})
@FilterableRelation('payoutMethod', () => PayoutMethodDTO, {
  nullable: true,
})
@Relation('paymentGateway', () => PaymentGatewayDTO, { nullable: true })
@Relation('savedPaymentMethod', () => SavedPaymentMethodDTO, { nullable: true })
@Relation('customer', () => CustomerDTO)
export class ParkingTransactionDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
  createdAt!: Date;
  @Field(() => GraphQLISODateTime, { nullable: false })
  transactionDate!: Date;
  @FilterableField(() => TransactionStatus)
  status!: TransactionStatus;
  @FilterableField(() => TransactionType)
  type!: TransactionType;
  @FilterableField(() => ParkingTransactionDebitType, { nullable: true })
  debitType?: ParkingTransactionDebitType;
  @FilterableField(() => ParkingTransactionCreditType, { nullable: true })
  creditType?: ParkingTransactionCreditType;
  @FilterableField()
  currency!: string;
  @FilterableField()
  amount!: number;
  @Field(() => String, { nullable: true })
  documentNumber?: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @FilterableField(() => ID)
  customerId!: number;
  @FilterableField(() => ID, { nullable: true })
  payoutSessionId?: number;
  @FilterableField(() => ID, { nullable: true })
  payoutAccountId?: number;
  @FilterableField(() => ID, { nullable: true })
  payoutMethodId?: number;
  @FilterableField(() => ID, { nullable: true })
  payoutSessionMethodId?: number;
  @FilterableField(() => ID, { nullable: true })
  parkSpotId?: number;
}
