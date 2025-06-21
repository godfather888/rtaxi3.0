import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { ShopOrderCartInput } from './shop-order.input';

@InputType()
export class CalculateDeliveryFeeInput {
  @Field(() => [ShopOrderCartInput])
  carts: ShopOrderCartInput[];

  @Field(() => ID)
  deliveryAddressId: number;
}
