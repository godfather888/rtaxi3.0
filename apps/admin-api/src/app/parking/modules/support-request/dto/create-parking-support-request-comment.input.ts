import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateParkingSupportRequestCommentInput {
  @Field(() => ID)
  supportRequestId: number;
  @Field(() => String, { nullable: false })
    comment: string;
}
