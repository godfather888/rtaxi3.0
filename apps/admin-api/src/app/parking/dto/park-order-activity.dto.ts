import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';
import { ParkOrderStatus } from '@ridy/database';

@ObjectType('ParkOrderActivity')
export class ParkOrderActivityDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => GraphQLISODateTime, { nullable: true })
    updatedAt?: Date;
  @Field(() => ParkOrderStatus, { nullable: false })
    status!: ParkOrderStatus;
  @Field(() => GraphQLISODateTime, { nullable: true })
    expectedBy?: Date;
}
