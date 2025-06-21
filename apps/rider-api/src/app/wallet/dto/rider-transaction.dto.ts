import {
  Authorize,
  FilterableField,
  IDField,
} from '@ptc-org/nestjs-query-graphql';
import {
  Field,
  GraphQLTimestamp,
  ID,
  ObjectType,
  Float,
} from '@nestjs/graphql';
import { RiderDeductTransactionType } from '@ridy/database';
import { RiderRechargeTransactionType } from '@ridy/database';
import { TransactionAction } from '@ridy/database';

import { UserContext } from '../../auth/authenticated-user';

@ObjectType('RiderTransacion')
@Authorize({
  authorize: (context: UserContext) => ({
    riderId: { eq: context.req.user.id },
  }),
})
export class RiderTransactionDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => GraphQLTimestamp)
  createdAt!: number;
  @Field(() => TransactionAction, { nullable: false })
  action!: TransactionAction;
  @Field(() => RiderDeductTransactionType, { nullable: true })
  deductType?: RiderDeductTransactionType;
  @Field(() => RiderRechargeTransactionType, { nullable: true })
  rechargeType?: RiderRechargeTransactionType;
  @Field(() => Float, { nullable: false })
  amount!: number;
  @Field(() => String, { nullable: false })
  currency!: string;
  @Field(() => String, { nullable: true })
  refrenceNumber?: string;
  @FilterableField(() => ID, { filterOnly: true })
  riderId!: number;
  @FilterableField(() => ID, { filterOnly: true, nullable: true })
  shopOrderId?: number;
}
