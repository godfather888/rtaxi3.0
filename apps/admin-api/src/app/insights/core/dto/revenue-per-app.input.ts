import { Field, Float, ObjectType } from '@nestjs/graphql';
import { AppType } from '@ridy/database';

@ObjectType('RevenuePerApp')
export class RevenuePerApp {
  @Field(() => AppType, { nullable: false })
    app: AppType;
  @Field(() => Float)
  revenue: number;
  @Field(() => Date, {
    description: 'Any date within the range of revenue interval.',
  })
  date: Date;
}
