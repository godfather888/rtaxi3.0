import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateTaxiSupportRequestCommentInput {
  @Field(() => ID)
  supportRequestId: number;
  @Field(() => String, { nullable: false })
    comment: string;
}
