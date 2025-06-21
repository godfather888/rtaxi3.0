import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { DeliveryMethod } from '@ridy/database';

@InputType()
export class ShopOrderInput {
  @Field(() => DeliveryMethod)
  deliveryMethod!: DeliveryMethod;

  @Field(() => ID)
  deliveryAddressId!: number;

  @Field(() => [ShopOrderCartInput])
  carts: ShopOrderCartInput[];
}

@InputType()
export class ShopOrderCartInput {
  @Field(() => ID)
  shopId: number;

  @Field(() => [ShopOrderCartItemInput])
  items: ShopOrderCartItemInput[];
}

@InputType()
export class ShopOrderCartItemInput {
  @Field(() => ID)
  productId: number;
  @Field(() => ID)
  itemVariantId: number;

  @Field(() => [ID])
  itemOptionIds: number[];

  @Field(() => Int)
  quantity: number;
}
