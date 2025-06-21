import { Field, ObjectType, Float } from '@nestjs/graphql';

@ObjectType('FinancialTimeline')
export class FinancialTimeline {
  @Field(() => Float, { nullable: false })
    amount: number;
  @Field(() => Date, {
    description: 'Any date within the range of revenue interval.',
  })
  anyDate: Date;
  @Field(() => String, { nullable: false })
    dateString: string;
}
