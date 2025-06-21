import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Point } from '@ridy/database';

@InputType()
export class CreateOrderInput {
  @Field(() => ID)
  riderId: number;
  @Field(() => ID, { nullable: true })
  driverId?: number;
  @Field(() => ID)
  serviceId!: number;
  @Field(() => [Point], { nullable: false })
  points!: Point[];
  @Field(() => [String], { nullable: false })
  addresses!: string[];
  @Field(() => Int, { defaultValue: 0 })
  waitingTimeMinutes!: number;
  @Field(() => Boolean, {
    defaultValue: false,
  })
  twoWay!: boolean;
  @Field(() => [ID], { defaultValue: [] })
  optionIds!: string[];
  @Field(() => Int, { defaultValue: 0 })
  intervalMinutes!: number;
}
