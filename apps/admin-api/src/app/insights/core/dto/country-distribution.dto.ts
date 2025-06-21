import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('CountryDistribution')
export class CountryDistributionDTO {
  @Field(() => String, { nullable: false })
    country: string;
  @Field(() => Int)
  count: number;
}
