import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('RegistrationResultItem')
export class RegistrationResultItemDto {
  @Field(() => String, { nullable: false })
    time: string;
  @Field(() => Int)
  count: number;
}
