import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { PayoutMethodDTO } from './payout-method.dto';

@ObjectType('PayoutStatistics')
export class PayoutStatisticsDTO {
  @Field(() => Float)
  pendingAmount: number;
  @Field(() => Float)
  lastPayoutAmount: number;
  @Field(() => [PayoutMethodStatsDTO])
  usersDefaultPayoutMethodStats: PayoutMethodStatsDTO[];
  @Field(() => String)
  currency: string;
}

@ObjectType('PayoutMethodStats')
export class PayoutMethodStatsDTO {
  @Field(() => PayoutMethodDTO, { nullable: true })
  payoutMethod?: PayoutMethodDTO;
  @Field(() => Int)
  totalCount: number;
}
