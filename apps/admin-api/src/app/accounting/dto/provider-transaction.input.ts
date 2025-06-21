import { Field, ID, InputType, Float } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  CreateOneInputType,
  FilterableField,
} from '@ptc-org/nestjs-query-graphql';
import { ProviderDeductTransactionType } from '@ridy/database';
import { ProviderExpenseType } from '@ridy/database';
import { ProviderRechargeTransactionType } from '@ridy/database';
import { TransactionAction } from '@ridy/database';
import { UserContext } from '../../auth/authenticated-admin';

@InputType()
@BeforeCreateOne(
  (
    input: CreateOneInputType<ProviderTransactionInput>,
    context: UserContext,
  ) => {
    return { input: { ...input.input, operatorId: context.req.user.id } };
  },
)
export class ProviderTransactionInput {
  @Field(() => TransactionAction)
  action!: TransactionAction;
  @Field(() => ProviderDeductTransactionType, { nullable: true })
  deductType?: ProviderDeductTransactionType;
  @Field(() => ProviderRechargeTransactionType, { nullable: true })
  rechargeType?: ProviderRechargeTransactionType;
  @Field(() => ProviderExpenseType, { nullable: true })
  expenseType?: ProviderExpenseType;
  @Field(() => Float, { nullable: false })
  amount!: number;
  @Field(() => String, { nullable: false })
  currency!: string;
  @Field(() => String, { nullable: true })
  refrenceNumber?: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @FilterableField(() => ID, { nullable: true })
  operatorId?: number;
}
