import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('NameCount')
export class NameCountDTO {
  @Field(() => String, { nullable: false })
    name: string;
  @Field(() => Int)
  count: number;
}
