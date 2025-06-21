import { ID, ObjectType, Field } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { ShopDTO } from './shop.dto';

@ObjectType('ShopWallet')
@Relation('shop', () => ShopDTO)
export class ShopWalletDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField()
  balance: number;
  @FilterableField()
  currency: string;
  @FilterableField(() => ID)
  shopId?: number;
}
