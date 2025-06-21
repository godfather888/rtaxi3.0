import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateShopCategoryInput {
  @Field(() => String, { nullable: false })
    name: string;
  @Field(() => String, { nullable: true })
    description?: string;
  @Field(() => ID)
  imageId: number;
}
