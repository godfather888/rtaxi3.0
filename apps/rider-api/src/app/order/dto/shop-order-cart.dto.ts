import { ID, ObjectType, Field } from '@nestjs/graphql';
import { IDField, Relation } from '@ptc-org/nestjs-query-graphql';
import { CartStatus } from '@ridy/database';
import { ShopDTO } from './shop.dto';

@ObjectType()
@Relation('shop', () => ShopDTO)
export class ShopOrderCartDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => CartStatus, { nullable: false })
  status!: CartStatus;
}
