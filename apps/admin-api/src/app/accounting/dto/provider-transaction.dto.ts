import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { ProviderDeductTransactionType } from '@ridy/database';
import { ProviderRechargeTransactionType } from '@ridy/database';
import { TransactionAction } from '@ridy/database';
import { ProviderExpenseType } from '@ridy/database';

@ObjectType('ProviderTransaction')
export class ProviderTransactionDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
  createdAt!: Date;
  @FilterableField(() => TransactionAction)
  action: TransactionAction;
  @FilterableField(() => ProviderDeductTransactionType, { nullable: true })
  deductType?: ProviderDeductTransactionType;
  @FilterableField(() => ProviderRechargeTransactionType, { nullable: true })
  rechargeType?: ProviderRechargeTransactionType;
  @FilterableField(() => ProviderExpenseType, { nullable: true })
  expenseType?: ProviderExpenseType;
  @FilterableField()
  amount: number;
  @FilterableField()
  currency: string;
  @Field(() => String, { nullable: true })
  refrenceNumber?: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @FilterableField(() => ID, { nullable: true })
  operatorId?: number;
  @FilterableField(() => ID, { name: 'requestId', nullable: true })
  taxiOrderId?: number;
  @FilterableField(() => ID, { nullable: true })
  parkOrderId?: number;
  @FilterableField(() => ID, { nullable: true })
  shopOrderCartId?: number;
}
