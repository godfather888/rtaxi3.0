import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UsedUnusedCountPairDTO {
  @Field(() => Int)
  used: number;
  @Field(() => Int)
  unused: number;
}
