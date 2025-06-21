import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class UpdateSosReasonInput {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
}
