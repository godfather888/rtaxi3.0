import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Login')
export class LoginDTO {
  @Field(() => String, { nullable: false })
  accessToken!: string;
  @Field(() => String, { nullable: false })
  refreshToken!: string;
}
