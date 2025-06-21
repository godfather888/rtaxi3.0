import {
  Field,
  ID,
  Int,
  ObjectType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { DriverStatus } from '@ridy/database';
import { Gender } from '@ridy/database';
import { IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType()
export class OnlineDriver {
  @Field(() => Point, { nullable: false })
  location: Point;
  @Field(() => ID)
  driverId!: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
  lastUpdatedAt!: Date;
}

@ObjectType()
export class OnlineDriverWithData {
  @IDField(() => ID)
  id!: number;
  @Field(() => Point, { nullable: false })
  location!: Point;
  @Field(() => GraphQLISODateTime, { nullable: false })
  lastUpdatedAt!: Date;
  @Field(() => String, { nullable: true })
  firstName?: string;
  @Field(() => String, { nullable: true })
  lastName?: string;
  @Field(() => String, { nullable: true })
  avatarUrl?: string;
  @Field(() => String, { nullable: false })
  mobileNumber!: string;
  @Field(() => DriverStatus, { nullable: false })
  status!: DriverStatus;
  @Field(() => Gender, { nullable: true })
  gender?: Gender;
  @Field(() => Int, { nullable: true })
  rating?: number;
  @Field(() => Int, { nullable: false })
  reviewCount!: number;
}
