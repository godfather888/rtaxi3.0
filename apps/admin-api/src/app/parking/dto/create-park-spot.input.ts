import { Field, ID, InputType, Int, ObjectType, Float } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { Point } from '@ridy/database';
import { Gender } from '@ridy/database';
import { ParkSpotCarSize } from '@ridy/database';
import { ParkSpotFacility } from '@ridy/database';
import { ParkSpotType } from '@ridy/database';
import { WeekdayScheduleDTO } from '@ridy/database';

@InputType()
export class CreateParkSpotInput {
  @Field(() => ParkSpotType, { nullable: false })
    type: ParkSpotType;
  @FilterableField(() => String)
  name?: string;
  @Field(() => Point)
  location!: Point;
  @Field(() => String, { nullable: true })
    address?: string;
  @Field(() => String, { nullable: true })
    phoneNumber?: string;
  @Field(() => String, { nullable: true })
    email?: string;
  @Field(() => [WeekdayScheduleDTO])
  weekdaySchedule?: WeekdayScheduleDTO[];
  @Field(() => ParkSpotCarSize, { nullable: true })
  carSize?: ParkSpotCarSize;
  @Field(() => Float, { nullable: true })
    carPrice?: number;
  @Field(() => Int)
  carSpaces: number;
  @Field(() => Float, { nullable: true })
    bikePrice?: number;
  @Field(() => Int)
  bikeSpaces: number;
  @Field(() => Float, { nullable: true })
    truckPrice?: number;
  @Field(() => Int)
  truckSpaces: number;
  @Field(() => String, { nullable: true })
    description?: string;
  @Field(() => [ParkSpotFacility])
  facilities!: ParkSpotFacility[];
  @Field(() => String, { nullable: false })
    ownerFirstName: string;
  @Field(() => String, { nullable: false })
    ownerLastName: string;
  @Field(() => String, { nullable: false })
    ownerEmail: string;
  @Field(() => String, { nullable: false })
    ownerPhoneNumber: string;
  @Field(() => Gender, { nullable: false })
    ownerGender: Gender;
  @Field(() => [ID])
  imageIds?: number[];
  @Field(() => ID, { nullable: true })
  mainImageId?: number;
}
