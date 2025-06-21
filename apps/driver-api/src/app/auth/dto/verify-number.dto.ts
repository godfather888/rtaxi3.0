import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VerifyNumberDto {
  @Field({
    description:
      'If an existing user then the hash will be null, so the user can be logged in using password instead of OTP.',
  })
  isExistingUser: boolean;
  @Field({
    nullable: true,
    description:
      'Hash that will need to be passed in subsequent verify code call in order for match and verifcation to happen.',
  })
  hash?: string;
}
