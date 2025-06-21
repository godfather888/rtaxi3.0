import { ID, ObjectType, Field } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('ShopFeedbackParameter')
export class ShopFeedbackParameterDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => Boolean, { nullable: false })
    isGood: boolean;
  @Field(() => String, { nullable: false })
    name: string;
}
