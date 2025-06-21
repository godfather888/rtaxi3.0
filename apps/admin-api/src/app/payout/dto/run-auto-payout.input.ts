import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class RunAutoPayoutInput {
  @Field(() => ID)
  payoutSessionId!: number;
  @Field(() => ID)
  payoutMethodId!: number;
}
