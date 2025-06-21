import { Field, InputType, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { ParkSpotFacility } from '@ridy/database';
import { ParkSpotType } from '@ridy/database';
import { ParkSpotVehicleType } from '@ridy/database';

@InputType()
export class ParkSpotFilterInput {
  @Field(() => Point, { nullable: false })
    point: Point;
  @Field(() => ParkSpotVehicleType, { nullable: true })
    vehicleType?: ParkSpotVehicleType;
  @Field(() => GraphQLISODateTime, { nullable: true })
    fromTime?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
    toTime?: Date;
  @Field(() => Int)
  maximumDistance?: number;
  @Field(() => Int)
  minimumRating?: number;
  @Field(() => [ParkSpotFacility])
  facilities?: ParkSpotFacility[];
  @Field(() => ParkSpotType, { nullable: true })
    parkingType?: ParkSpotType;
}
