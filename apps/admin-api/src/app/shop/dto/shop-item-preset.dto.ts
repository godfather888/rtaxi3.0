import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableOffsetConnection,
  IDField,
} from '@ptc-org/nestjs-query-graphql';
import { ItemCategoryDTO } from './item-category.dto';
import { ItemDTO } from './item.dto';
import { WeekdayScheduleDTO } from '@ridy/database';

@ObjectType('ShopItemPreset')
@FilterableOffsetConnection('itemCategories', () => ItemCategoryDTO)
@FilterableOffsetConnection('items', () => ItemDTO, {
  enableTotalCount: true,
})
export class ShopItemPresetDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField()
  name!: string;
  @FilterableField(() => ID)
  shopId!: number;
  @Field(() => [WeekdayScheduleDTO])
  weeklySchedule: WeekdayScheduleDTO[];
}
