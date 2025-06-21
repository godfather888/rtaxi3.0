import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { WeekdayScheduleDTO } from '@ridy/database';

@InputType()
export class UpdateShopItemPresetInput {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => [WeekdayScheduleDTO], { nullable: true })
  weeklySchedule?: WeekdayScheduleDTO[];
}
