import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  oldPassword: string;
  @Field(() => String)
  newPassword: string;
}
