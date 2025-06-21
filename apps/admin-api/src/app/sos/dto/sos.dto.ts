import {
  FilterableField,
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { SOSStatus } from '@ridy/database';
import { OrderDTO } from '../../order/dto/order.dto';
import { SOSActivityDTO } from './sos-activity.dto';
import { SOSReasonDTO } from './sos-reason.dto';

@ObjectType('DistressSignal')
@UnPagedRelation('activities', () => SOSActivityDTO)
@Relation('order', () => OrderDTO, { relationName: 'request' })
@Relation('reason', () => SOSReasonDTO, { nullable: true })
export class SOSDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
    createdAt!: Date;
  @FilterableField(() => SOSStatus)
  status!: SOSStatus;
  @Field(() => String, { nullable: true })
    comment?: string;
  @Field(() => Point, { nullable: true })
    location?: Point;
  @Field(() => Boolean, { nullable: false })
    submittedByRider!: boolean;
  @Field(() => ID)
    requestId!: number;
}
