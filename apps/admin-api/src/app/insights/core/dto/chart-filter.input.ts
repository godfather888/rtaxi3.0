import { Field, InputType, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { ChartInterval } from '@ridy/database';

@InputType()
export class ChartFilterInput {
  @Field(() => GraphQLISODateTime, { nullable: false })
    startDate: Date;
  @Field(() => GraphQLISODateTime, { nullable: false })
    endDate: Date;
  @Field(() => ChartInterval)
  interval: ChartInterval;
}
