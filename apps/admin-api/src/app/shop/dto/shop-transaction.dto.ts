import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { TransactionType } from '@ridy/database';
import { ShopTransactionCreditType } from '@ridy/database';
import { ShopTransactionDebitType } from '@ridy/database';
import { ShopDTO } from './shop.dto';
import { SavedPaymentMethodDTO } from '../../customer/dto/saved-payment-method.dto';
import { PaymentGatewayDTO } from '../../payment-gateway/dto/payment-gateway.dto';
import { OperatorDTO } from '../../operator/dto/operator.dto';
import { TransactionStatus } from '@ridy/database';
import { PayoutMethodDTO } from '../../payout/dto/payout-method.dto';
import { PayoutAccountDTO } from '../../payout/dto/payout-account.dto';
import { AppType } from '@ridy/database';

@ObjectType('ShopTransaction')
@Relation('staff', () => OperatorDTO, { nullable: true })
@Relation('payoutAccount', () => PayoutAccountDTO, {
  nullable: true,
})
@FilterableRelation('payoutMethod', () => PayoutMethodDTO, {
  nullable: true,
})
@Relation('paymentGateway', () => PaymentGatewayDTO, { nullable: true })
@Relation('savedPaymentMethod', () => SavedPaymentMethodDTO, { nullable: true })
@Relation('shop', () => ShopDTO)
export class ShopTransactionDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField(() => ID)
  shopId!: number;
  @FilterableField(() => TransactionStatus)
  status!: TransactionStatus;
  @Field(() => GraphQLISODateTime, { nullable: false })
  createdAt!: Date;
  @Field(() => GraphQLISODateTime, { nullable: false })
  transactionDate!: Date;
  @FilterableField(() => TransactionType, { nullable: false })
  type!: TransactionType;
  @FilterableField(() => ShopTransactionDebitType, { nullable: true })
  debitType?: ShopTransactionDebitType;
  @FilterableField(() => ShopTransactionCreditType, { nullable: true })
  creditType?: ShopTransactionCreditType;
  @FilterableField({ nullable: false })
  currency!: string;
  @FilterableField({ nullable: false })
  amount!: number;
  @Field(() => String, { nullable: true })
  documentNumber?: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @FilterableField(() => ID, { nullable: true })
  payoutSessionId?: number;
  @FilterableField(() => ID, { nullable: true })
  payoutAccountId?: number;
  @FilterableField(() => ID, { nullable: true })
  payoutMethodId?: number;
  @FilterableField(() => ID, { nullable: true })
  payoutSessionMethodId?: number;
}
