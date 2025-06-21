import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { AppType } from '@ridy/database';

@InputType()
export class ManualPayoutInput {
  @Field(() => AppType, {
    defaultValue: AppType.Taxi,
    description:
      "Fill this with the user's app type. Taxi for a driver, Parking for a Park Owner and Shop for a shop owner",
  })
  appType: AppType;
  @Field(() => ID)
  userTransactionId: number;
  @Field(() => String, { nullable: false })
    transactionNumber: string;
  @Field(() => String, { nullable: true })
    description?: string;
}
