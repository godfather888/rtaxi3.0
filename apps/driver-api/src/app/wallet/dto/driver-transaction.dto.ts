import {
  Authorize,
  FilterableField,
  IDField,
} from '@ptc-org/nestjs-query-graphql';
import {
  ID,
  ObjectType,
  Field,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { DriverDeductTransactionType } from '@ridy/database';
import { DriverRechargeTransactionType } from '@ridy/database';
import { TransactionAction } from '@ridy/database';

import { UserContext } from '../../auth/authenticated-user';

@ObjectType('DriverTransacion')
@Authorize({
  authorize: (context: UserContext) => ({
    driverId: { eq: context.req.user.id },
  }),
})
export class DriverTransactionDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
  createdAt!: Date;
  @Field(() => TransactionAction, { nullable: false })
  action!: TransactionAction;
  @Field(() => DriverDeductTransactionType, { nullable: true })
  deductType?: DriverDeductTransactionType;
  @Field(() => DriverRechargeTransactionType, { nullable: true })
  rechargeType?: DriverRechargeTransactionType;
  @Field(() => Float, { nullable: false })
  amount!: number;
  @Field(() => String, { nullable: false })
  currency!: string;
  @Field(() => String, { nullable: true })
  refrenceNumber?: string;
  @FilterableField(() => ID, { filterOnly: true })
  @Field(() => ID)
  driverId!: number;
}
