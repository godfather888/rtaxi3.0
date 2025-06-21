import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { MessageStatus } from '@ridy/database';
import { OrderDTO } from '../../order/dto/order.dto';

@ObjectType('OrderMessage')
@Relation('request', () => OrderDTO)
export class OrderMessageDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
  sentAt!: Date;
  @Field(() => MessageStatus, { nullable: false })
  status!: MessageStatus;
  @Field(() => String, { nullable: false })
  content!: string;
  @Field(() => Boolean, { nullable: false })
  sentByDriver!: boolean;
  @FilterableField(() => ID)
  requestId!: number;
}
