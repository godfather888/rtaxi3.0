import { Field, ID, InputType, ObjectType, Float } from '@nestjs/graphql';
import { ProviderDeductTransactionType } from '@ridy/database';
import { ProviderRechargeTransactionType } from '@ridy/database';
import { TransactionAction } from '@ridy/database';

@InputType()
export class FleetTransactionInput {
  @Field(() => TransactionAction, { nullable: false })
    action: TransactionAction;
  @Field(() => ProviderDeductTransactionType, { nullable: true })
    deductType?: ProviderDeductTransactionType;
  @Field(() => ProviderRechargeTransactionType, { nullable: true })
    rechargeType?: ProviderRechargeTransactionType;
  @Field(() => Float, { nullable: false })
    amount: number;
  @Field(() => String, { nullable: false })
    currency: string;
  @Field(() => String, { nullable: true })
    refrenceNumber?: string;
  @Field(() => ID)
  fleetId!: number;
  @Field(() => String, { nullable: true })
    description?: string;
}
