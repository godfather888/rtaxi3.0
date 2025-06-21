import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CancelShopOrderCartsInput {
  @Field(() => [ID])
  cartIds: number[];
}
