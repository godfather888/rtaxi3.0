import { IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';

@ObjectType('FeedbackParameter')
export class FeedbackParameterDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, { nullable: false })
  title!: string;
  @Field(() => Boolean, { nullable: false })
  isGood!: boolean;
}
