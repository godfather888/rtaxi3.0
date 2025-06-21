import {
  Authorize,
  IDField,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { Field, ID, Int, ObjectType, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { ServiceDTO } from '../../service/dto/service.dto';
import { CouponAuthorizer } from './coupon.authorizer';

@ObjectType('Coupon')
@UnPagedRelation('allowedServices', () => ServiceDTO)
@Authorize(CouponAuthorizer)
export class CouponDTO {
  @IDField(() => ID)
  id!: number;
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
