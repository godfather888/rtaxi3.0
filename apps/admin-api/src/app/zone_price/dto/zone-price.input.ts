import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { Point, TimeMultiplier } from '@ridy/database';

@InputType()
export class ZonePriceInput {
  @Field(() => String)
  name!: string;
  @Field(() => [[Point]])
  from!: Point[][];
  @Field(() => [[Point]])
  to!: Point[][];
  @Field(() => Float)
  cost: number;
  @Field(() => [TimeMultiplier])
  timeMultipliers!: TimeMultiplier[];
}
