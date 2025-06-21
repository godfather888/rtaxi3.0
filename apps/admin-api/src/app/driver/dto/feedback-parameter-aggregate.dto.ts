import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('FeedbackParameterAggregate')
export class FeedbackParameterAggregateDto {
  @Field(() => ID)
  count: number;
  @Field(() => String, { nullable: false })
    title: string;
  @Field(() => Boolean, { nullable: false })
    isGood: boolean;
}
