import {
  Field,
  ID,
  Int,
  ObjectType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  IDField,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ReviewStatus } from '@ridy/database';
import { ShopFeedbackParameterDTO } from './shop-feedback-parameter.dto';
import { ShopOrderCartDTO } from '../../../dto/shop-order-cart.dto';

@ObjectType('ShopFeedback')
@FilterableRelation('orderCart', () => ShopOrderCartDTO)
@UnPagedRelation('parameters', () => ShopFeedbackParameterDTO)
export class ShopFeedbackDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => Int, { description: 'The score of the review, from 0 to 100' })
  score!: number;
  @FilterableField(() => String, { nullable: true })
  comment?: string;
  @FilterableField(() => ReviewStatus)
  status!: ReviewStatus;
  @Field(() => GraphQLISODateTime, { nullable: false })
  createdAt!: Date;
  @FilterableField(() => ID)
  shopId!: number;
  @FilterableField(() => ID)
  customerId!: number;
}
