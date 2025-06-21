import { Field, ID, InputType } from '@nestjs/graphql';
import { ShopCategoryStatus } from '@ridy/database';

@InputType()
export class UpdateShopCategoryInput {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => ID, { nullable: true })
  imageId?: number;
  @Field(() => ShopCategoryStatus, { nullable: true })
  status?: ShopCategoryStatus;
}
