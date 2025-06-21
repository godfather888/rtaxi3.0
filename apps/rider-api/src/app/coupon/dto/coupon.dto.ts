import { IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType('Coupon')
export class CouponDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, { nullable: false })
  code!: string;
  @Field(() => String, { nullable: false })
  title!: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => GraphQLISODateTime, { nullable: true })
  expireAt?: Date;
}
