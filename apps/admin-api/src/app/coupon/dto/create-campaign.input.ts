import {
  Field,
  Float,
  InputType,
  Int,
  registerEnumType, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { AppType } from '@ridy/database';

@InputType()
export class CreateCampaignInput {
  @Field(() => String, { nullable: false })
    name!: string;
  @Field(() => String, { nullable: true })
    description?: string;
  @Field(() => Int)
  manyUsersCanUse!: number;
  @Field(() => Int)
  manyTimesUserCanUse!: number;
  @Field(() => Float, { nullable: true })
    minimumCost?: number;
  @Field(() => Float, { nullable: true })
    maximumCost?: number;
  @Field(() => GraphQLISODateTime, { nullable: true })
    startAt?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
    expireAt?: Date;
  @Field(() => Float)
  discountPercent?: number;
  @Field(() => Float, { nullable: true })
    discountFlat?: number;
  @Field(() => Boolean, { nullable: false })
    isFirstTravelOnly!: boolean;
  @Field(() => Int)
  codesCount!: number;
  @Field(() => Boolean, { nullable: false })
    sendSMS!: boolean;
  @Field(() => String, { nullable: true })
    smsText?: string;
  @Field(() => Boolean, { nullable: false })
    sendEmail!: boolean;
  @Field(() => String, { nullable: true })
    emailSubject?: string;
  @Field(() => String, { nullable: true })
    emailText?: string;
  @Field(() => Boolean, { nullable: false })
    sendPush!: boolean;
  @Field(() => String, { nullable: true })
    pushTitle?: string;
  @Field(() => String, { nullable: true })
    pushText?: string;
  @Field(() => GraphQLISODateTime, { nullable: true })
    sendAt?: Date;
  @Field(() => [CampaignTargetSegmentCriteria], { nullable: false })
    targetUsers: CampaignTargetSegmentCriteria[];
}

@InputType()
export class CampaignTargetSegmentCriteria {
  @Field(() => AppType, { nullable: false })
    appType: AppType;
  @Field(() => Int)
  lastDays: number;
  @Field(() => CampaignCriteriaOrdersType, { nullable: false })
    type: CampaignCriteriaOrdersType;
  @Field(() => Float)
  value: number;
}

export enum CampaignCriteriaOrdersType {
  OrderCountMoreThan = 'OrderCountMoreThan',
  OrderCountLessThan = 'OrderCountLessThan',
  PurchaseAmountMoreThan = 'PurchaseAmountMoreThan',
  PurchaseAmountLessThan = 'PurchaseAmountLessThan',
}

registerEnumType(CampaignCriteriaOrdersType, {
  name: 'CampaignCriteriaOrdersType',
});
