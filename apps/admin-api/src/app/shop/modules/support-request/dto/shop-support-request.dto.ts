import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ShopOrderDTO } from '../../../dto/shop-order.dto';
import { OperatorDTO } from '../../../../operator/dto/operator.dto';
import { ComplaintStatus } from '@ridy/database';
import { ShopSupportRequestActivityDTO } from './shop-support-request-activity.dto';
import { ShopOrderCartDTO } from '../../../dto/shop-order-cart.dto';

@ObjectType('ShopSupportRequest')
@FilterableRelation('order', () => ShopOrderDTO)
@Relation('cart', () => ShopOrderCartDTO, { nullable: true })
@UnPagedRelation('assignedToStaffs', () => OperatorDTO, {
  disableFilter: true,
  disableSort: true,
})
@UnPagedRelation('activities', () => ShopSupportRequestActivityDTO)
export class ShopSupportRequestDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
  createdAt!: Date;
  @FilterableField(() => Boolean)
  requestedByShop!: boolean;
  @Field(() => String, { nullable: false })
  subject!: string;
  @Field(() => String, { nullable: true })
  content?: string;
  @FilterableField(() => ComplaintStatus)
  status!: ComplaintStatus;
  @FilterableField(() => ID, {})
  orderId!: number;
  @FilterableField(() => ID, { nullable: true })
  cartId?: number;
}
