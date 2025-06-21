import { Field, ID, Int, ObjectType, Float } from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { Point } from '@ridy/database';

@ObjectType('ShopDeliveryZone')
export class ShopDeliveryZoneDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField(() => ID)
  shopId!: number;
  @FilterableField(() => String, { nullable: true })
  name?: string;
  @FilterableField(() => Float, { nullable: false })
  deliveryFee!: number;
  @Field(() => Int)
  minDeliveryTimeMinutes!: number;
  @Field(() => Int)
  maxDeliveryTimeMinutes!: number;

  @Field(() => Float, { nullable: false })
  minimumOrderAmount!: number;
  @FilterableField()
  enabled!: boolean;
  @Field(() => [[Point]], { nullable: false })
  location!: Point[][];
}
