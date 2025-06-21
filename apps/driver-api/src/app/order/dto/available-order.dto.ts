import {
  Field,
  Int,
  ObjectType,
  ID,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { OrderStatus } from '@ridy/database';
import { IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('AvailableOrder')
export class AvailableOrderDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
  createdOn!: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  startTimestamp?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  finishTimestamp?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  etaPickup?: Date;
  @Field(() => OrderStatus, { nullable: false })
  status!: OrderStatus;
  @Field(() => GraphQLISODateTime, { nullable: false })
  expectedTimestamp!: Date;
  @Field(() => Float, { nullable: false })
  costBest!: number;
  @Field(() => Int)
  distanceBest!: number;
  @Field(() => Int)
  durationBest!: number;
  @Field(() => String, { nullable: false })
  currency!: string;
  @Field(() => ID, { nullable: true })
  driverId?: number;
  @Field(() => [String], { nullable: false })
  addresses!: string[];
  @Field(() => [Point], { nullable: false })
  points!: Point[];
}
