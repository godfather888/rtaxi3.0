import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateItemCategoryInput {
  @Field(() => String, { nullable: false })
    name: string;
  @Field(() => ID)
  shopId: number;
}
