import { ID, ObjectType, Field } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  OffsetConnection,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { ShopCategoryStatus } from '@ridy/database';
import { MediaDTO } from '../../upload/media.dto';
import { ShopDTO } from './shop.dto';

@ObjectType('ShopCategory')
@Relation('image', () => MediaDTO, { nullable: true })
@OffsetConnection('shops', () => ShopDTO, {
  enableTotalCount: true,
  relationName: 'shops',
})
export class ShopCategoryDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField()
  name!: string;
  @FilterableField(() => ShopCategoryStatus)
  status!: ShopCategoryStatus;
}
