import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ComplaintActivityType } from '@ridy/database';
import { OperatorDTO } from '../../../../operator/dto/operator.dto';
import { ComplaintStatus } from '@ridy/database';

@ObjectType('ParkingSupportRequestActivity')
@Relation('actor', () => OperatorDTO, { nullable: true })
@UnPagedRelation('assignedToStaffs', () => OperatorDTO, {
  disableFilter: true,
  disableSort: true,
})
@UnPagedRelation('unassignedFromStaffs', () => OperatorDTO, {
  disableFilter: true,
  disableSort: true,
})
export class ParkingSupportRequestActivityDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
    createdAt: Date;
  @Field(() => ComplaintActivityType, { nullable: false })
    type: ComplaintActivityType;
  @Field(() => String, { nullable: true })
    comment?: string;
  @Field(() => ComplaintStatus, { nullable: true })
    statusFrom?: ComplaintStatus;
  @Field(() => ComplaintStatus, { nullable: true })
    statusTo?: ComplaintStatus;
}
