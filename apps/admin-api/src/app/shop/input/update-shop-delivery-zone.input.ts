import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { Point } from '@ridy/database';

@InputType()
export class UpdateShopDeliveryZoneInput {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => Float, { nullable: true })
  deliveryFee?: number;
  @Field(() => Int)
  minDeliveryTimeMinutes?: number;
  @Field(() => Int)
  maxDeliveryTimeMinutes?: number;
  @Field(() => Float, { nullable: true })
  minimumOrderAmount?: number;
  @Field(() => [[Point]], { nullable: true })
  location?: Point[][];
  @Field(() => Boolean, { nullable: true })
  enabled?: boolean;
}
