import { Field, ID, InputType } from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { TaxiOrderType } from '@ridy/database';

@InputType()
export class CalculateFareInput {
  @Field(() => [Point], { nullable: false })
  points!: Point[];
  @Field(() => ID)
  riderId!: number;
  @Field(() => TaxiOrderType, { nullable: false })
  orderType!: TaxiOrderType;
}
