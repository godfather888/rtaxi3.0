import { Field, ID, InputType, ObjectType, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { TransactionType } from '@ridy/database';
import { ParkingTransactionCreditType } from '@ridy/database';
import { ParkingTransactionDebitType } from '@ridy/database';

@InputType()
export class CreateParkingTransactionInput {
  @Field(() => GraphQLISODateTime, { nullable: true })
    transactionDate?: Date;
  @Field(() => TransactionType, { nullable: false })
    type: TransactionType;
  @Field(() => ParkingTransactionDebitType, { nullable: true })
    debitType?: ParkingTransactionDebitType;
  @Field(() => ParkingTransactionCreditType, { nullable: true })
    creditType?: ParkingTransactionCreditType;
  @Field(() => Float, { nullable: false })
    amount: number;
  @Field(() => String, { nullable: false })
    currency: string;
  @Field(() => String, { nullable: true })
    documentNumber?: string;
  @Field(() => ID)
  customerId!: number;
  @Field(() => String, { nullable: true })
    description?: string;
}
