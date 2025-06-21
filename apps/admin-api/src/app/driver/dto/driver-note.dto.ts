import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { OperatorDTO } from '../../operator/dto/operator.dto';

@ObjectType('DriverNote')
@Relation('staff', () => OperatorDTO)
export class DriverNoteDTO {
  @IDField(() => ID)
  id!: number;

  @Field()
  createdAt!: Date;

  @FilterableField(() => ID, { filterRequired: true })
  driverId!: number;

  @Field()
  note!: string;
}
