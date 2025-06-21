import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { ShopOrderDTO } from './shop-order.dto';
import { NoteDTO } from '../../auth/dto/note.dto';
import { OperatorDTO } from '../../operator/dto/operator.dto';

@ObjectType('ShopOrderNote')
@Relation('order', () => ShopOrderDTO)
@Relation('staff', () => OperatorDTO)
export class ShopOrderNoteDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => NoteDTO)
  note: NoteDTO;
  @FilterableField(() => ID, { filterRequired: true })
  orderId: number;
  @Field(() => ID)
  staffId: number;
}
