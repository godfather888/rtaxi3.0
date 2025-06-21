import { ID, ObjectType, Field, Float } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('ItemOption')
export class ItemOptionDTO {
  @IDField(() => ID)
  id!: number;

  @Field(() => String, { nullable: false })
    name!: string;

  @Field(() => String, { nullable: true })
    description?: string;

  @Field(() => Float, { nullable: false })
    price!: number;
}
