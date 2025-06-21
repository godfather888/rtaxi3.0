import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { OperatorDTO } from '../../operator/dto/operator.dto';
import { ParkOrderDTO } from './park-order.dto';

@ObjectType('ParkOrderNote')
@Relation('staff', () => OperatorDTO)
@Relation('parkOrder', () => ParkOrderDTO)
export class ParkOrderNoteDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
    createdAt: Date;
  @FilterableField(() => ID)
  parkOrderId: number;
  @Field(() => String, { nullable: false })
    note: string;
}
