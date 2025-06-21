import { Field, ID, Int, ObjectType, Float, GraphQLISODateTime } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  OffsetConnection,
} from '@ptc-org/nestjs-query-graphql';
import { CampaignCodeDTO } from './campaign-code.dto';
import { AppType } from '@ridy/database';

@ObjectType('Campaign')
@OffsetConnection('codes', () => CampaignCodeDTO, { enableAggregate: true })
export class CampaignDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField()
  name: string;
  @Field(() => String, { nullable: true })
    description?: string;
  @Field(() => [AppType])
  appType: AppType[];
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
  @Field(() => GraphQLISODateTime, { nullable: true })
    expireAt?: Date;
  @Field(() => String, { nullable: false })
    currency!: string;
  @Field(() => Float, { nullable: false })
    discountPercent!: number;
  @Field(() => Float, { nullable: false })
    discountFlat!: number;
  @Field(() => Boolean, { nullable: false })
    isEnabled!: boolean;
  @Field(() => Boolean, { nullable: false })
    isFirstTravelOnly!: boolean;
}
