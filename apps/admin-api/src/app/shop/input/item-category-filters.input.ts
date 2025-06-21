import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ItemCategoryFiltersInput {
  @Field(() => ID)
  shopId!: number;
  @Field(() => String, { nullable: false })
    timeOfDay!: string;
}
