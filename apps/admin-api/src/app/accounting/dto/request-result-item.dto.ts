import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '@ridy/database';

@ObjectType()
export class RequestResultItem {
  @Field(() => String)
  time: string;
  @Field(() => Int)
  count: number;
  @Field(() => OrderStatus)
  status: OrderStatus;
}
