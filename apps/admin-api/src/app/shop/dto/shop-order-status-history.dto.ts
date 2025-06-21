import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { ShopOrderStatus } from '@ridy/database';
import { ShopOrderCartDTO } from './shop-order-cart.dto';

@ObjectType('ShopOrderStatusHistory')
@Relation('orderCart', () => ShopOrderCartDTO)
export class ShopOrderStatusHistoryDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => ShopOrderStatus, { nullable: false })
    status: ShopOrderStatus;
  @Field(() => GraphQLISODateTime, { nullable: true })
    expectedBy?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
    updatedAt?: Date;
  @FilterableField(() => ID)
  orderId!: number;
}
