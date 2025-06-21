import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('DriverDocumentRetentionPolicy')
export class DriverDocumentRetentionPolicyDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => String, { nullable: false })
    title: string;
  @Field(() => Int)
  deleteAfterDays: number;
}
