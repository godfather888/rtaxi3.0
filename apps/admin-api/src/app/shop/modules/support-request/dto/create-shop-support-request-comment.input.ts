import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateShopSupportRequestCommentInput {
  @Field(() => ID)
  supportRequestId: number;
  @Field(() => String, { nullable: false })
    comment: string;
}
