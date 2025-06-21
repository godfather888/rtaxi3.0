import { ID, Int, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  IDField,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ReviewStatus } from '@ridy/database';
import { ParkingFeedbackParameterDTO } from './parking-feedback-parameter.dto';
import { ParkOrderDTO } from '../../../dto/park-order.dto';

@ObjectType('ParkingFeedback')
@FilterableRelation('order', () => ParkOrderDTO)
@UnPagedRelation('parameters', () => ParkingFeedbackParameterDTO)
export class ParkingFeedbackDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField(() => Int, {
    description: 'The score of the review, from 0 to 100',
  })
  score: number;
  @Field(() => String, { nullable: true })
    comment?: string;
  @FilterableField(() => ReviewStatus)
  status: ReviewStatus;
  @Field(() => GraphQLISODateTime, { nullable: false })
    createdAt: Date;
  @FilterableField(() => ID)
  parkSpotId: number;
  @FilterableField(() => ID)
  customerId: number;
}
