import {
  FilterableField,
  FilterableRelation,
  FilterableUnPagedRelation,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { Field, ID, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { FeedbackParameterDTO } from './feedback-parameter.dto';
import { OrderDTO } from '../../order/dto/order.dto';
import { DriverDTO } from '../../driver/dto/driver.dto';

@ObjectType('Feedback')
@FilterableUnPagedRelation('parameters', () => FeedbackParameterDTO, {
  enableAggregate: true,
})
@Relation('driver', () => DriverDTO)
@FilterableRelation('request', () => OrderDTO)
export class FeedbackDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => Int)
  score!: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
    reviewTimestamp: Date;
  @Field(() => String, { nullable: true })
    description?: string;
  @FilterableField(() => ID)
  driverId: number;
  @FilterableField(() => ID)
  requestId: number;
}
