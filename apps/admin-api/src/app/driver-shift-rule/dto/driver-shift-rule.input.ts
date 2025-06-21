import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { TimeFrequency } from '@ridy/database';

@InputType()
export class DriverShiftRuleInput {
  @Field(() => TimeFrequency, { nullable: false })
    timeFrequency: TimeFrequency;
  @Field(() => Int)
  maxHoursPerFrequency: number;
  @Field(() => Int)
  mandatoryBreakMinutes: number;
}
