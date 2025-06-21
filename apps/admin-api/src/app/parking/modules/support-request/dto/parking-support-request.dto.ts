import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  IDField,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ComplaintStatus } from '@ridy/database';
import { OperatorDTO } from '../../../../operator/dto/operator.dto';
import { ParkOrderDTO } from '../../../dto/park-order.dto';
import { ParkingSupportRequestActivityDTO } from './parking-support-request-activity.dto';

@ObjectType('ParkingSupportRequest')
@FilterableRelation('parkOrder', () => ParkOrderDTO)
@UnPagedRelation('assignedToStaffs', () => OperatorDTO, {
  disableFilter: true,
  disableSort: true,
})
@UnPagedRelation('activities', () => ParkingSupportRequestActivityDTO)
export class ParkingSupportRequestDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
  createdAt!: Date;
  @FilterableField(() => Boolean)
  requestedByOwner!: boolean;
  @Field(() => String, { nullable: false })
  subject: string;
  @Field(() => String, { nullable: true })
  content?: string;
  @FilterableField(() => ComplaintStatus)
  status!: ComplaintStatus;
  @FilterableField(() => ID)
  parkOrderId!: number;
}
