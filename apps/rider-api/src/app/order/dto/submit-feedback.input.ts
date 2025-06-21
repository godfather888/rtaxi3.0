import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SubmitFeedbackInput {
  @Field(() => Int, { description: 'Score, a value between 0 to 100' })
  score!: number;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => ID)
  requestId!: number;
  @Field(() => [ID], { defaultValue: [] })
  parameterIds?: number[];
  @Field(() => Boolean, { nullable: true })
  addToFavorite?: boolean;
}
