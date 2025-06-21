import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String, { nullable: false })
  firebaseToken!: string;
}
