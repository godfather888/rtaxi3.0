import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class UpdateItemCategoryInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
