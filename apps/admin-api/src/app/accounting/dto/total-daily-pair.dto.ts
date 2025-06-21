import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType('TotalDailyPair')
export class TotalDailyPairDTO {
  @Field(() => Float)
  total: number;
  @Field(() => Float)
  daily: number;
}
