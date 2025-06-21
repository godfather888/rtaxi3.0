import { Field, Int, ObjectType, Float } from '@nestjs/graphql';
import { ShopDTO } from './shop.dto';

@ObjectType('DispatcherShop')
export class DispatcherShopDTO extends ShopDTO {
  @Field(() => Float, { nullable: false })
    deliveryFee!: number;
  @Field(() => Int)
  minDeliveryTime!: number;
  @Field(() => Int)
  maxDeliveryTime!: number;
  @Field(() => Float, { nullable: false })
    minimumOrderAmount!: number;
  // @Field(() => RatingAggregateDTO)
  // ratingAggregate!: RatingAggregateDTO;
}
