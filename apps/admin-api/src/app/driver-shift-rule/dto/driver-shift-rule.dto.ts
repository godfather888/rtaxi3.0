import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';
import { TimeFrequency } from '@ridy/database';

@ObjectType('DriverShiftRule')
export class DriverShiftRuleDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => TimeFrequency, { nullable: false })
    timeFrequency: TimeFrequency;
  @Field(() => Int)
  maxHoursPerFrequency: number;
  @Field(() => Int)
  mandatoryBreakMinutes: number;
}
