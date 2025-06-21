import {
  FilterableField,
  FilterableRelation,
  IDField,
  PagingStrategies,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { ComplaintStatus } from '@ridy/database';
import { OrderDTO } from '../../order/dto/order.dto';
import { TaxiSupportRequestActivityDTO } from './taxi-support-request-activity.dto';
import { OperatorDTO } from '../../operator/dto/operator.dto';

@ObjectType('TaxiSupportRequest')
@UnPagedRelation('activities', () => TaxiSupportRequestActivityDTO, {
  pagingStrategy: PagingStrategies.NONE,
})
@FilterableRelation('order', () => OrderDTO, { relationName: 'request' })
@UnPagedRelation('assignedToStaffs', () => OperatorDTO, {
  disableFilter: true,
  disableSort: true,
})
export class TaxiSupportRequestDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
    inscriptionTimestamp!: Date;
  @FilterableField()
  requestedByDriver: boolean;
  @Field(() => String, { nullable: false })
    subject: string;
  @Field(() => String, { nullable: true })
    content?: string;
  @FilterableField(() => ComplaintStatus)
  status: ComplaintStatus;
  @FilterableField(() => ID)
  requestId: number;
}
