import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { CustomerDTO } from './customer.dto';
import { OperatorDTO } from '../../operator/dto/operator.dto';

@ObjectType('CustomerNote')
@Relation('customer', () => CustomerDTO)
@Relation('createdBy', () => OperatorDTO)
export class CustomerNoteDTO {
  @IDField(() => ID)
  id: string;
  @Field(() => GraphQLISODateTime, { nullable: false })
    createdAt!: Date;
  @FilterableField(() => ID, { filterRequired: true })
  customerId!: number;
  @Field(() => String, { nullable: false })
    note!: string;
  @Field(() => ID)
    createdById!: number;
}
