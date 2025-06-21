import { Field, ID, InputType, Int, Float } from '@nestjs/graphql';
import { Point } from '@ridy/database';

@InputType()
export class CreateShopDeliveryZoneInput {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => ID)
  shopId: number;
  @Field(() => Float, { nullable: false })
  deliveryFee: number;
  @Field(() => Int)
  minDeliveryTimeMinutes: number;
  @Field(() => Int)
  maxDeliveryTimeMinutes: number;
  @Field(() => Float, { nullable: false })
  minimumOrderAmount: number;
  @Field(() => [[Point]], { nullable: false })
  location: Point[][];
}
