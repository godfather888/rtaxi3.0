import { ID, ObjectType, Field, Float, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Authorize,
  FilterableField,
  IDField,
  OffsetConnection,
} from '@ptc-org/nestjs-query-graphql';
import { GiftCodeDTO } from './gift-code.dto';
import { GiftBatchAuthorizer } from '../gift-batch.authorizer';

@ObjectType('GiftBatch')
@OffsetConnection('giftCodes', () => GiftCodeDTO, {
  enableTotalCount: true,
  enableAggregate: true,
})
@Authorize(GiftBatchAuthorizer)
export class GiftBatchDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField()
  name: string;
  @FilterableField()
  currency!: string;
  @Field(() => Float, { nullable: false })
    amount: number;
  @Field(() => GraphQLISODateTime, { nullable: true })
    availableFrom?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
    expireAt?: Date;
}
