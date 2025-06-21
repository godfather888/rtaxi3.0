import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IncomeResultItem {
  @Field(() => String)
  time: string;
  @Field(() => Float)
  sum: number;
  @Field(() => String)
  currency: string;
}
