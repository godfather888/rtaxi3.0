import { Field, Float, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType('RevenueExpensePair')
export class RevenueExpensePair {
  @Field(() => Float)
  revenue: number;
  @Field(() => Float)
  expense: number;
  @Field(() => GraphQLISODateTime)
  anyDate: Date;
  @Field(() => String)
  dateString: string;
}
