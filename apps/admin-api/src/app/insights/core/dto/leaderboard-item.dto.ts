import { Field, ID, Int, ObjectType, Float } from '@nestjs/graphql';
import { IDField } from "@ptc-org/nestjs-query-graphql";

@ObjectType('LeaderboardItem')
export class LeaderboardItemDTO {
  @Field(() => ID)
    @IDField(() => ID)
  id: number;
  @Field(() => String, { nullable: false })
    name: string;
  @Field(() => String, { nullable: true })
    avatarUrl?: string;
  @Field(() => String, { nullable: true })
    currency?: string;
  @Field(() => Float, { nullable: true })
    totalAmount?: number;
  @Field(() => Int)
  totalCount?: number;
}
