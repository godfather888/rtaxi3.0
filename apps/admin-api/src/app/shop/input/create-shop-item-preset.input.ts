import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { WeekdayScheduleDTO } from '@ridy/database';

@InputType()
export class CreateShopItemPresetInput {
  @Field(() => String, { nullable: false })
    name!: string;
  @Field(() => ID)
  shopId!: number;
  @Field(() => [WeekdayScheduleDTO], { nullable: false })
    weeklySchedule!: WeekdayScheduleDTO[];
}
