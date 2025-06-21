import { ID, ObjectType, Field } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableOffsetConnection,
  FilterableUnPagedRelation,
  IDField,
} from '@ptc-org/nestjs-query-graphql';
import { ItemDTO } from './item.dto';
import { ShopItemPresetDTO } from './shop-item-preset.dto';

@ObjectType('ItemCategory')
@FilterableOffsetConnection('items', () => ItemDTO, {
  enableTotalCount: true,
})
@FilterableUnPagedRelation('presets', () => ShopItemPresetDTO)
export class ItemCategoryDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField()
  name!: string;
  @IDField(() => ID)
  shopId!: number;
}
