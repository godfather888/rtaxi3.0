import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';
import { MessageStatus } from '@ridy/database';

@ObjectType('OrderMessage')
export class OrderMessageDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
    sentAt: Date;
  @Field(() => Boolean, { nullable: false })
    sentByDriver: boolean;
  @Field(() => MessageStatus, { nullable: false })
    status: MessageStatus;
  @Field(() => String, { nullable: false })
    content: string;
}
