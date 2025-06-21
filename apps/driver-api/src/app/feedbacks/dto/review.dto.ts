import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType('Review')
export class ReviewEntity {
  @Field(() => String, { nullable: false })
  serviceName: string;
  @Field(() => Float, { nullable: false })
  rating: number;
  @Field(() => String, { nullable: false })
  review: string;
  @Field(() => [String], { nullable: false })
  goodPoints: string[];
}
