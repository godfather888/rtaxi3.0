import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class RegionCategoryInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  currency!: string;
}
