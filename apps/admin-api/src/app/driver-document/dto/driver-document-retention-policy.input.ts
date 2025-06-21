import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class DriverDocumentRetentionPolicyInput {
  @Field(() => String, { nullable: false })
    title: string;
  @Field(() => Int)
  deleteAfterDays: number;
  @Field(() => ID)
  driverDocumentId: number;
}
