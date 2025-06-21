import { Field, ID, InputType, ObjectType, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { TransactionType } from '@ridy/database';
import { ShopTransactionCreditType } from '@ridy/database';
import { ShopTransactionDebitType } from '@ridy/database';

@InputType()
export class CreateShopTransactionInput {
  @Field(() => GraphQLISODateTime, { nullable: true })
    transactionDate?: Date;
  @Field(() => TransactionType, { nullable: false })
    type: TransactionType;
  @Field(() => ShopTransactionDebitType, { nullable: true })
    debitType?: ShopTransactionDebitType;
  @Field(() => ShopTransactionCreditType, { nullable: true })
    creditType?: ShopTransactionCreditType;
  @Field(() => Float, { nullable: false })
    amount: number;
  @Field(() => String, { nullable: false })
    currency: string;
  @Field(() => String, { nullable: true })
    documentNumber?: string;
  @Field(() => ID)
  shopId!: number;
  @Field(() => String, { nullable: true })
    description?: string;
}
