import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ShopFiltersInput {
  @Field(() => ID)
  categoryId: number;
  @Field(() => ID)
  addressId: number;

  @Field({ nullable: true })
  query?: string;
}
