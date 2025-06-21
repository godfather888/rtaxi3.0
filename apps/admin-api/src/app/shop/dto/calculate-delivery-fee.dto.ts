import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('CalculateDeliveryFee')
export class CalculateDeliveryFeeDTO {
  @Field(() => Float)
  batchDeliveryFee: number;
  @Field(() => Int)
  batchDeliveryDuration: number;
  @Field(() => Float)
  splitDeliveryFee: number;
}
