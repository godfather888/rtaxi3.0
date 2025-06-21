import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { OperatorDTO } from '../../operator/dto/operator.dto';

@ObjectType('TaxiOrderNote')
@Relation('staff', () => OperatorDTO)
export class TaxiOrderNoteDTO {
  @IDField(() => ID)
  id!: number;

  @Field()
  createdAt!: Date;

  @FilterableField(() => ID, { filterRequired: true })
  orderId!: number;

  @Field()
  note!: string;
}
