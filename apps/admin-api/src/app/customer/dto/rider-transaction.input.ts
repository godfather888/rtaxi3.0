import { Field, ID, InputType, ObjectType, Float } from '@nestjs/graphql';
import { RiderDeductTransactionType } from '@ridy/database';
import { RiderRechargeTransactionType } from '@ridy/database';
import { TransactionAction } from '@ridy/database';

@InputType()
export class RiderTransactionInput {
  @Field(() => TransactionAction, { nullable: false })
    action: TransactionAction;
  @Field(() => RiderDeductTransactionType, { nullable: true })
    deductType?: RiderDeductTransactionType;
  @Field(() => RiderRechargeTransactionType, { nullable: true })
    rechargeType?: RiderRechargeTransactionType;
  @Field(() => Float, { nullable: false })
    amount: number;
  @Field(() => String, { nullable: false })
    currency: string;
  @Field(() => String, { nullable: true })
    refrenceNumber?: string;
  @Field(() => String, { nullable: true })
    description?: string;
  @Field(() => ID)
  riderId!: number;
}
