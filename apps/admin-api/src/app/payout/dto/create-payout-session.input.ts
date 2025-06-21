import { Field, ID, InputType, ObjectType, Float } from '@nestjs/graphql';
import { AppType } from '@ridy/database';

@InputType()
export class CreatePayoutSessionInput {
  @Field(() => [ID])
  payoutMethodIds: number[];
  @Field(() => Float, { nullable: false })
    minimumAmount: number;
  @Field(() => String, { nullable: false })
    currency: string;
  @Field(() => String, { nullable: true })
    description?: string;
  @Field(() => AppType, { defaultValue: AppType.Taxi })
  appType: AppType;
}
