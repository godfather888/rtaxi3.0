import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class AssignShopSupportRequestInput {
  @Field(() => ID)
  supportRequestId: number;
  @Field(() => [ID])
  staffIds: number[];
}
