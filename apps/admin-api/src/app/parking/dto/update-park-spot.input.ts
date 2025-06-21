import { Field, ID, InputType, Int, ObjectType, Float } from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { ParkSpotCarSize } from '@ridy/database';
import { ParkSpotFacility } from '@ridy/database';
import { ParkSpotType } from '@ridy/database';
import { ParkSpotStatus } from '@ridy/database';
import { WeekdayScheduleDTO } from '@ridy/database';

@InputType()
export class UpdateParkSpotInput {
  @Field(() => ParkSpotStatus, { nullable: true })
  status?: ParkSpotStatus;
  @Field(() => ParkSpotType, { nullable: true })
  type?: ParkSpotType;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => Point, { nullable: true })
  location?: Point;
  @Field(() => String, { nullable: true })
  address?: string;
  @Field(() => String, { nullable: true })
  phoneNumber?: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => [WeekdayScheduleDTO], { nullable: true })
  weeklySchedule?: WeekdayScheduleDTO[];
  @Field(() => ParkSpotCarSize, { nullable: true })
  carSize?: ParkSpotCarSize;
  @Field(() => Float, { nullable: true })
  carPrice?: number;
  @Field(() => Int, { nullable: true })
  carSpaces?: number;
  @Field(() => Float, { nullable: true })
  bikePrice?: number;
  @Field(() => Int, { nullable: true })
  bikeSpaces?: number;
  @Field(() => Float, { nullable: true })
  truckPrice?: number;
  @Field(() => Int, { nullable: true })
  truckSpaces?: number;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => [ParkSpotFacility], { nullable: true })
  facilities?: ParkSpotFacility[];
  @Field(() => ID, { nullable: true })
  mainImageId?: number;
}
