import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ServiceCategoryInput {
  @Field(() => String)
  name!: string;
  @Field(() => String, { nullable: true })
  enabled?: boolean;
}
