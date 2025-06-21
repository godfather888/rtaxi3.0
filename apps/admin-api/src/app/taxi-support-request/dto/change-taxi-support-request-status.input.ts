import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { ComplaintStatus } from '@ridy/database';

@InputType()
export class ChangeTaxiSupportRequestStatusInput {
  @Field(() => ID)
  supportRequestId: number;
  @Field(() => ComplaintStatus, { nullable: false })
    status: ComplaintStatus;
}
