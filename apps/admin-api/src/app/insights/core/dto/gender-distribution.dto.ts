import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Gender } from '@ridy/database';

@ObjectType('GenderDistribution')
export class GenderDistributionDTO {
  @Field(() => Gender)
  gender: Gender;
  @Field(() => Int)
  count: number;
}
