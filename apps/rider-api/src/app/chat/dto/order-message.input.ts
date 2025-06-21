import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class OrderMessageInput {
  @Field(() => ID)
  requestId!: number;
  @Field(() => String, { nullable: false })
  content!: string;
}
