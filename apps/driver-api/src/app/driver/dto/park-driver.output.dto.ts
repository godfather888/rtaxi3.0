import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DriverStatus } from '@ridy/database';

@ObjectType()
export class ParkDriverOutput {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => Int)
  driverId!: number;

  @Field(() => String)
  status!: DriverStatus;
}
