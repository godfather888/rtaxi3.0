import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Point } from '@ridy/database';

@ObjectType('DriverLocationUpdate')
export class DriverLocationUpdateDTO {
  @Field(() => Point, { nullable: false })
  point!: Point;
  @Field(() => ID, { nullable: false })
  driverId!: number;
  @Field(() => ID, { nullable: false })
  orderId!: number;
}
