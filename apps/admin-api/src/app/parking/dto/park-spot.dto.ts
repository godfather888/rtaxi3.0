import {
  Field,
  ID,
  Int,
  ObjectType,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  OffsetConnection,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { Point } from '@ridy/database';
import { ParkSpotCarSize } from '@ridy/database';
import { ParkSpotFacility } from '@ridy/database';
import { ParkSpotType } from '@ridy/database';
import { MediaDTO } from '../../upload/media.dto';
import { ParkOrderDTO } from './park-order.dto';
import { ParkingFeedbackDTO } from '../modules/feedback/dto/parking-feedback.dto';
import { CustomerDTO } from '../../customer/dto/customer.dto';
import { ParkSpotStatus } from '@ridy/database';
import { WeekdayScheduleDTO } from '@ridy/database';
import { RatingAggregateDTO } from '../../core/fragments/rating-aggregate.dto';

@ObjectType('ParkSpot')
@UnPagedRelation('images', () => MediaDTO)
@Relation('mainImage', () => MediaDTO, { nullable: true })
@Relation('owner', () => CustomerDTO, { nullable: true })
@OffsetConnection('feedbacks', () => ParkingFeedbackDTO)
@OffsetConnection('parkOrders', () => ParkOrderDTO, { enableTotalCount: true })
export class ParkSpotDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField(() => ParkSpotStatus)
  status!: ParkSpotStatus;
  @FilterableField(() => ParkSpotType)
  type!: ParkSpotType;
  @FilterableField(() => String, { nullable: true })
  name?: string;
  @Field(() => Point)
  location!: Point;
  @FilterableField(() => String, { nullable: true })
  address?: string;
  @Field(() => String, { nullable: true })
  phoneNumber?: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @FilterableField(() => RatingAggregateDTO)
  ratingAggregate!: RatingAggregateDTO;
  @Field(() => String, { nullable: true })
  openHour?: string;
  @Field(() => GraphQLISODateTime, { nullable: false })
  createdAt!: Date;
  @Field(() => [WeekdayScheduleDTO])
  weeklySchedule!: WeekdayScheduleDTO[];
  @Field(() => GraphQLISODateTime, { nullable: true })
  lastActivityAt?: Date;
  @Field(() => String, { nullable: true })
  closeHour?: string;
  @Field(() => Boolean, { nullable: false })
  acceptNewRequest!: boolean;
  @Field(() => Boolean, { nullable: false })
  acceptExtendRequest!: boolean;
  @FilterableField(() => ParkSpotCarSize, { nullable: true })
  carSize?: ParkSpotCarSize;
  @Field(() => Float, { nullable: true })
  carPrice?: number;
  @Field(() => Int)
  carSpaces!: number;
  @Field(() => Float, { nullable: true })
  bikePrice?: number;
  @Field(() => Int)
  bikeSpaces!: number;
  @Field(() => Float, { nullable: true })
  truckPrice?: number;
  @Field(() => Int)
  truckSpaces!: number;
  @Field(() => String, { nullable: false })
  currency!: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => String, { nullable: true })
  operatorName?: string;
  @Field(() => String, { nullable: true })
  operatorPhoneCountryCode?: string;
  @Field(() => String, { nullable: true })
  operatorPhoneNumber?: string;
  @Field(() => [ParkSpotFacility])
  facilities!: ParkSpotFacility[];
  @Field(() => ID, { nullable: true })
  mainImageId?: number;
  // a virtual field for current status of the park spot
  // @Field(() => ParkSpotStatus, {
  //   middleware: [
  //     async (ctx: MiddlewareContext) => {
  //       const source = ctx.source;
  //       const openHour = source.openHour;
  //       const closeHour = source.closeHour;
  //       const now = new Date();
  //       // if the park spot is closed
  //       if (openHour && closeHour) {
  //         const openHourParts = openHour.split(':');
  //         const closeHourParts = closeHour.split(':');
  //         const openTime = new Date();
  //         openTime.setHours(parseInt(openHourParts[0]));
  //         openTime.setMinutes(parseInt(openHourParts[1]));
  //         const closeTime = new Date();
  //         closeTime.setHours(parseInt(closeHourParts[0]));
  //         closeTime.setMinutes(parseInt(closeHourParts[1]));
  //         if (now < openTime || now > closeTime) {
  //           return ParkSpotStatus.Closed;
  //         }
  //       }
  //       if (
  //         source.acceptNewRequest &&
  //         source.acceptExtendRequest &&
  //         (source.carSpaces > 0 ||
  //           source.bikeSpaces > 0 ||
  //           source.truckSpaces > 0)
  //       ) {
  //         return ParkSpotStatus.Available;
  //       }
  //       return ParkSpotStatus.Occupied;
  //     },
  //   ],
  // })
  // status: ParkSpotStatus;
}
