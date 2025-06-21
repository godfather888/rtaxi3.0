import { Field, ID, InputType, Int, ObjectType, Float } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { TimeMultiplier, DistanceMultiplier } from '@ridy/database';
import { ServicePaymentMethod } from '@ridy/database';
import { TaxiOrderType } from '@ridy/database';
import { DateRangeMultiplier } from '@ridy/database';
import { WeekdayMultiplier } from '@ridy/database';

@InputType()
export class ServiceInput {
  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => Int, { nullable: true })
  personCapacity?: number;
  @FilterableField(() => ID, { nullable: false })
  categoryId!: number;
  @Field(() => Float, { nullable: false })
  baseFare!: number;
  @Field(() => [TaxiOrderType], { defaultValue: [TaxiOrderType.Ride] })
  orderTypes!: TaxiOrderType[];
  @Field(() => Float, { nullable: true })
  roundingFactor?: number;
  @Field(() => Float, { nullable: false })
  perHundredMeters: number;
  @Field(() => Float, { nullable: false })
  perMinuteDrive!: number;
  @Field(() => Float, { nullable: false })
  perMinuteWait!: number;
  @Field(() => Float, { nullable: false })
  prepayPercent!: number;
  @Field(() => Float, { nullable: false })
  minimumFee!: number;
  @Field(() => Int, { nullable: false })
  searchRadius!: number;
  @Field(() => ServicePaymentMethod, { nullable: false })
  paymentMethod!: ServicePaymentMethod;
  @Field(() => Float, { nullable: false })
  cancellationTotalFee!: number;
  @Field(() => Float, { nullable: false })
  cancellationDriverShare!: number;
  @Field(() => Int, { nullable: false })
  providerSharePercent!: number;
  @Field(() => Float, { nullable: false })
  providerShareFlat!: number;
  @Field(() => Boolean, { nullable: false })
  twoWayAvailable!: boolean;
  @Field(() => Int, { nullable: false })
  maximumDestinationDistance!: number;
  @Field(() => [TimeMultiplier], { nullable: false })
  timeMultipliers!: TimeMultiplier[];
  @Field(() => [DistanceMultiplier], { nullable: false })
  distanceMultipliers!: DistanceMultiplier[];
  @Field(() => [WeekdayMultiplier], { nullable: false })
  weekdayMultipliers!: WeekdayMultiplier[];
  @Field(() => [DateRangeMultiplier], { nullable: false })
  dateRangeMultipliers!: DateRangeMultiplier[];
  @Field(() => ID, { nullable: false })
  mediaId!: number;
}
