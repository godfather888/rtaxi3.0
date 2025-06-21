import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ShopDateRangePairInput {
  @Field(() => ID)
  shopId?: number;
  @Field()
  startDate?: Date;

  @Field()
  endDate?: Date;
}
