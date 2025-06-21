import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { IDField, Relation } from '@ptc-org/nestjs-query-graphql';
import { ShopOrderCartDTO } from './shop-order-cart.dto';

@ObjectType()
@Relation('shopOrderCart', () => ShopOrderCartDTO)
export class TaxiOrderShopDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => GraphQLISODateTime, { nullable: true })
  pickedAt?: Date;
}
