import { IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { RequestActivityType } from '@ridy/database';

@ObjectType('RequestActivity')
export class RequestActivityDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
    createdAt: Date;
  @Field(() => RequestActivityType, { nullable: false })
    type: RequestActivityType;
}
