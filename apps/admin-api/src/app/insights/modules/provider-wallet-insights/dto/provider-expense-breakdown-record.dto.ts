import { Field, Float, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ProviderExpenseType } from '@ridy/database';

@ObjectType('ProviderExpenseBreakdownRecord')
export class ProviderExpenseBreakdownRecord {
  @Field(() => ProviderExpenseType)
  expenseType: ProviderExpenseType;
  @Field(() => Float)
  value: number;
  @Field(() => String)
  dateString: string;
  @Field(() => GraphQLISODateTime)
  anyDate: Date;
}
