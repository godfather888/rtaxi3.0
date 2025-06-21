import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class RemoveItemFromCartInput {
  @Field(() => ID)
  cartId: number;
  @Field(() => [RemoveItemFromCartItemQuantityPair])
  cancelables: RemoveItemFromCartItemQuantityPair[];
}

@InputType()
export class RemoveItemFromCartItemQuantityPair {
  @Field(() => ID)
  shopOrderCartItemId: number;
  @Field(() => Int)
  cancelQuantity: number;
}
