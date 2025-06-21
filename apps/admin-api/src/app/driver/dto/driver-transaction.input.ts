import { Field, ID, InputType, ObjectType, Float } from '@nestjs/graphql';
import { DriverDeductTransactionType } from '@ridy/database';
import { DriverRechargeTransactionType } from '@ridy/database';
import { TransactionAction } from '@ridy/database';

@InputType()
export class DriverTransactionInput {
  @Field(() => TransactionAction, { nullable: false })
    action: TransactionAction;
  @Field(() => DriverDeductTransactionType, { nullable: true })
    deductType?: DriverDeductTransactionType;
  @Field(() => DriverRechargeTransactionType, { nullable: true })
    rechargeType?: DriverRechargeTransactionType;
  @Field(() => Float, { nullable: false })
    amount: number;
  @Field(() => String, { nullable: false })
    currency: string;
  @Field(() => String, { nullable: true })
    refrenceNumber?: string;
  @Field(() => ID)
  driverId!: number;
  @Field(() => String, { nullable: true })
    description?: string;
}
