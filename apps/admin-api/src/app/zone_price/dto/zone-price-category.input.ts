import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ZonePriceCategoryInput {
  @Field(() => String)
  name!: string;
}
