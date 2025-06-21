import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { NoteDTO } from '../../auth/dto/note.dto';
import { ShopDTO } from './shop.dto';
import { OperatorDTO } from '../../operator/dto/operator.dto';

@ObjectType('ShopNote')
@Relation('shop', () => ShopDTO)
@Relation('staff', () => OperatorDTO)
export class ShopNoteDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => NoteDTO)
  note: NoteDTO;
  @FilterableField(() => ID, { filterRequired: true })
  shopId: number;
  @Field(() => ID)
  staffId: number;
}
