import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Authorize,
  FilterableField,
  IDField,
  OffsetConnection,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { PayoutSessionStatus } from '@ridy/database';
import { ParkingPayoutSessionPayoutMethodDetailDTO } from './parking-payout-session-payout-method-detail.dto';
import { PayoutMethodDTO } from '../../../dto/payout-method.dto';
import { PayoutAuthorizer } from '../../../payout.authorizer';
import { ParkingTransactionDTO } from '../../../../parking/dto/parking-transaction.dto';

@ObjectType('ParkingPayoutSession')
@OffsetConnection('parkingTransactions', () => ParkingTransactionDTO, {
  enableAggregate: true,
})
@UnPagedRelation(
  'payoutMethodDetails',
  () => ParkingPayoutSessionPayoutMethodDetailDTO,
)
@UnPagedRelation('payoutMethods', () => PayoutMethodDTO)
@Authorize(PayoutAuthorizer)
export class ParkingPayoutSessionDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
    createdAt!: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
    processedAt?: Date;
  @Field(() => String, { nullable: true })
    description?: string;
  @FilterableField(() => PayoutSessionStatus)
  status!: PayoutSessionStatus;
  @FilterableField()
  totalAmount!: number;
  @FilterableField()
  currency!: string;
}
