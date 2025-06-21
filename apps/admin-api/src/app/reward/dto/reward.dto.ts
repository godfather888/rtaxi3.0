import { IDField } from '@ptc-org/nestjs-query-graphql';
import {
  ID,
  ObjectType,
  Field,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { RewardAppType } from '@ridy/database';
import { RewardBeneficiary } from '@ridy/database';
import { RewardEvent } from '@ridy/database';

@ObjectType('Reward')
export class RewardDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => String, { nullable: false })
  title: string;
  @Field(() => GraphQLISODateTime, { nullable: true })
  startDate?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate?: Date;
  @Field(() => RewardAppType, { nullable: false })
  appType!: RewardAppType;
  @Field(() => RewardBeneficiary, { nullable: false })
  beneficiary!: RewardBeneficiary;
  @Field(() => RewardEvent, { nullable: false })
  event!: RewardEvent;
  @Field(() => Float, { nullable: false })
  creditGift!: number;
  @Field(() => Float, { nullable: true })
  tripFeePercentGift?: number;
  @Field(() => String, { nullable: true })
  creditCurrency?: string;
  @Field(() => Float, { nullable: true })
  conditionTripCountsLessThan?: number;
  @Field(() => [String], { nullable: true })
  conditionUserNumberFirstDigits?: string[];
}
