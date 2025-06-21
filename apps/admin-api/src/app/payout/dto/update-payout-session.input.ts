import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PayoutSessionStatus } from '@ridy/database';

@InputType()
export class UpdatePayoutSessionInput {
  @Field(() => PayoutSessionStatus)
  status: PayoutSessionStatus;
}
