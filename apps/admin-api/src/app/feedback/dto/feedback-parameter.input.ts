import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class FeedbackParameterInput {
  @Field(() => String)
  title: string;
  @Field(() => Boolean)
  isGood: boolean;
}
