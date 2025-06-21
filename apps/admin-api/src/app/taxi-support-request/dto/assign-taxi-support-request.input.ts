import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class AssignTaxiSupportRequestInput {
  @Field(() => ID)
  supportRequestId: number;
  @Field(() => [ID])
  staffIds: number[];
}
