import { Field, Float, ID, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  OffsetConnection,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { MediaDTO } from '../../upload/media.dto';
import { ItemVariantDTO } from './item-variant.dto';
import { ItemOptionDTO } from './item-option.dto';
import { ItemCategoryDTO } from './item-category.dto';
import { ShopItemPresetDTO } from './shop-item-preset.dto';
import { Column } from 'typeorm';
import { RatingAggregateDTO } from '../../core/fragments/rating-aggregate.dto';
import { ShopFeedbackDTO } from '../modules/feedback/dto/shop-feedback.dto';

@ObjectType('Item')
@Relation('image', () => MediaDTO, { nullable: true })
@UnPagedRelation('variants', () => ItemVariantDTO)
@UnPagedRelation('options', () => ItemOptionDTO)
@UnPagedRelation('categories', () => ItemCategoryDTO)
@UnPagedRelation('presets', () => ShopItemPresetDTO)
@OffsetConnection('feedbacks', () => ShopFeedbackDTO)
export class ItemDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField()
  name!: string;
  @Field(() => String, { nullable: true })
    description?: string;
  @Field(() => Float, { description: 'The base price of the item' })
  basePrice!: number;
  @Column(() => RatingAggregateDTO)
    @Field(() => RatingAggregateDTO, { nullable: false })
  ratingAggregate!: RatingAggregateDTO;
  @FilterableField(() => ID)
  shopId: number;
  @Field(() => Int, { description: 'The stock quantity' })
  stockQuantity: number;
  @Field(() => Int)
  discountPercentage!: number;
  @Field(() => Int)
  discountedQuantity!: number;
  @Field(() => GraphQLISODateTime, { nullable: true })
    discountUntil?: Date;
  @Field(() => Int)
  usedDiscountedQuantity!: number;
}
