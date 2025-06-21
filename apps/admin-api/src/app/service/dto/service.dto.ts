import {
  Authorize,
  FilterableField,
  IDField,
  PagingStrategies,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { Field, ID, Int, ObjectType, Float } from '@nestjs/graphql';
import { DistanceMultiplier } from '@ridy/database';
import { TimeMultiplier } from '@ridy/database';
import { ServicePaymentMethod } from '@ridy/database';
import { DateRangeMultiplier } from '@ridy/database';
import { WeekdayMultiplier } from '@ridy/database';
import { RegionDTO } from '../../region/dto/region.dto';
import { MediaDTO } from '../../upload/media.dto';
import { ServiceOptionDTO } from './service-option.dto';
import { ServiceAuthorizer } from './service.authorizer';
import { TaxiOrderType } from '@ridy/database';

@ObjectType('Service')
@UnPagedRelation('regions', () => RegionDTO, {
  pagingStrategy: PagingStrategies.NONE,
  update: { enabled: true },
})
@Relation('media', () => MediaDTO)
@UnPagedRelation('options', () => ServiceOptionDTO, {
  update: { enabled: true },
})
@Authorize(ServiceAuthorizer)
export class ServiceDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField(() => String)
  name!: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => [TaxiOrderType], { nullable: false })
  orderTypes!: TaxiOrderType[];
  @Field(() => Int, { nullable: true })
  personCapacity?: number;
  @FilterableField(() => ID)
  categoryId!: number;
  @Field(() => Float, { nullable: false })
  baseFare!: number;
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
