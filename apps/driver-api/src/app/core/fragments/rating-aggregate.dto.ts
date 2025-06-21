import { Field, InputType, Int, ObjectType, Float } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('RatingAggregate')
@InputType('RatingAggregateInput')
export class RatingAggregateDTO {
  @FilterableField(() => Int, { nullable: true })
    @Field(() => Float, { nullable: true })
  rating?: number;
  @Field(() => Int)
  reviewCount!: number;
}
