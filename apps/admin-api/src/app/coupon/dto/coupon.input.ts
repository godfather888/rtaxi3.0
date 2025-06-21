import { Field, InputType, Int, ObjectType, Float, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CouponInput {
  @Field(() => String, { nullable: false })
    code: string;
  @Field(() => String, { nullable: false })
    title: string;
  @Field(() => String, { nullable: false })
    description: string;
  @Field(() => Int)
  manyUsersCanUse!: number;
  @Field(() => Int)
  manyTimesUserCanUse!: number;
  @Field(() => Float, { nullable: false })
    minimumCost!: number;
  @Field(() => Float, { nullable: false })
    maximumCost!: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
    startAt!: Date;
  @Field(() => GraphQLISODateTime, { nullable: false })
    expireAt!: Date;
  @Field(() => Int)
  discountPercent!: number;
  @Field(() => Int)
  discountFlat!: number;
  @Field(() => Float, { nullable: false })
    creditGift!: number;
  @Field(() => Boolean, { nullable: false })
    isEnabled!: boolean;
  @Field(() => Boolean, { nullable: false })
    isFirstTravelOnly!: boolean;
}
