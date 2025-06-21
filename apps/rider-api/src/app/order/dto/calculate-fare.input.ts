import { Field, InputType, Int } from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { TaxiOrderType } from '@ridy/database';

@InputType()
export class CalculateFareInput {
  @Field(() => [Point], { nullable: false })
  points!: Point[];
  @Field(() => TaxiOrderType, { defaultValue: TaxiOrderType.Ride })
  orderType!: TaxiOrderType;
  @Field(() => Boolean, { nullable: true })
  twoWay?: boolean;
  @Field(() => String, { nullable: true })
  couponCode?: string;
  @Field(() => [String], { nullable: true })
  selectedOptionIds?: string[];
  @Field(() => Int, { nullable: true })
  waitTime?: number;
}
