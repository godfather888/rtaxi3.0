import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { OrderStatus } from '@ridy/database';

@InputType()
export class UpdateOrderInput {
  @Field(() => OrderStatus, { nullable: true })
  status?: OrderStatus;
  @Field(() => Float, { nullable: true })
  paidAmount?: number;
  @Field(() => Int, { nullable: true })
  destinationArrivedTo?: number;
}
