import { ObjectType, Field, Float } from '@nestjs/graphql';
import { ReviewEntity } from './review.dto';

@ObjectType('FeedbacksSummary')
export class FeedbacksSummaryDTO {
  @Field(() => Float, { nullable: true })
  averageRating?: number;
  @Field(() => [String], { nullable: false })
  goodPoints: string[];
  @Field(() => [String], { nullable: false })
  badPoints: string[];
  @Field(() => [ReviewEntity], { nullable: false })
  goodReviews: ReviewEntity[];
}
