import { ID, ObjectType, Field, Float } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ShopDTO } from './shop.dto';
import { ShopOrderDTO } from './shop-order.dto';
import { ShopTransactionDTO } from './shop-transaction.dto';
import { ProviderTransactionDTO } from '../../accounting/dto/provider-transaction.dto';
import { ShopOrderCartItemDTO } from './shop-order-cart-item.dto';
import { ShopFeedbackDTO } from '../modules/feedback/dto/shop-feedback.dto';

@ObjectType('ShopOrderCart')
@Relation('shop', () => ShopDTO)
@FilterableRelation('order', () => ShopOrderDTO)
@UnPagedRelation('shopTransactions', () => ShopTransactionDTO)
@UnPagedRelation('providerTransactions', () => ProviderTransactionDTO)
@UnPagedRelation('feedbacks', () => ShopFeedbackDTO, { nullable: true })
@UnPagedRelation('items', () => ShopOrderCartItemDTO)
export class ShopOrderCartDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => Float, { nullable: false })
    subtotal: number;
  @FilterableField(() => ID)
  shopId: number;
}
