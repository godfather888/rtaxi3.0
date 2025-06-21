import {
  FilterableField,
  FilterableRelation,
  Relation,
  IDField,
} from '@ptc-org/nestjs-query-graphql';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DriverDeductTransactionType } from '@ridy/database';
import { DriverRechargeTransactionType } from '@ridy/database';
import { TransactionAction } from '@ridy/database';
import { TransactionStatus } from '@ridy/database';
import { OperatorDTO } from '../../operator/dto/operator.dto';
import { PayoutAccountDTO } from '../../payout/dto/payout-account.dto';
import { DriverDTO } from './driver.dto';
import { PaymentGatewayDTO } from '../../payment-gateway/dto/payment-gateway.dto';
import { SavedPaymentMethodDTO } from '../../customer/dto/saved-payment-method.dto';
import { PayoutMethodDTO } from '../../payout/dto/payout-method.dto';

@ObjectType('DriverTransaction')
@Relation('operator', () => OperatorDTO, { nullable: true })
@Relation('driver', () => DriverDTO, { nullable: true })
@Relation('payoutAccount', () => PayoutAccountDTO, {
  nullable: true,
})
@FilterableRelation('payoutMethod', () => PayoutMethodDTO, {
  nullable: true,
})
@Relation('paymentGateway', () => PaymentGatewayDTO, { nullable: true })
@Relation('savedPaymentMethod', () => SavedPaymentMethodDTO, { nullable: true })
export class DriverTransactionDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField()
  createdAt!: Date;
  @FilterableField(() => TransactionAction)
  action!: TransactionAction;
  @FilterableField(() => TransactionStatus)
  status!: TransactionStatus;
  @Field(() => DriverDeductTransactionType, { nullable: true })
  deductType?: DriverDeductTransactionType;
  @Field(() => DriverRechargeTransactionType, { nullable: true })
  rechargeType?: DriverRechargeTransactionType;
  @FilterableField()
  amount!: number;
  @FilterableField()
  currency!: string;
  @Field(() => String, { nullable: true })
  refrenceNumber?: string;
  @FilterableField(() => ID, { nullable: true })
  driverId!: number;
  @FilterableField(() => ID, { nullable: true })
  paymentGatewayId?: number;
  @FilterableField(() => ID, { nullable: true })
  payoutSessionId?: number;
  @FilterableField(() => ID, { nullable: true })
  payoutAccountId?: number;
  @FilterableField(() => ID, { nullable: true })
  payoutMethodId?: number;
  @FilterableField(() => ID, { nullable: true })
  payoutSessionMethodId?: number;
  @Field(() => ID, { nullable: true })
  operatorId?: number;
  @Field(() => ID, { nullable: true })
  requestId?: number;
  @Field(() => String, { nullable: true })
  description?: string;
}
