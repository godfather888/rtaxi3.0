import {
  Authorize,
  FilterableField,
  IDField,
  OffsetConnection,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { RegionAuthorizer } from './region.authorizer';
import { OrderDTO } from '../../order/dto/order.dto';
import { RegionCategoryDTO } from './region-category.dto';

@ObjectType('Region')
@Authorize(RegionAuthorizer)
@OffsetConnection('taxiOrders', () => OrderDTO, { enableAggregate: true })
@Relation('category', () => RegionCategoryDTO, { nullable: true })
export class RegionDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField(() => String)
  name!: string;
  @FilterableField(() => String)
  currency!: string;
  @Field(() => Boolean, { nullable: false })
  enabled!: boolean;
  @Field(() => [[Point]], { nullable: false })
  location: Point[][];
  @FilterableField(() => ID)
  categoryId?: number;
}
