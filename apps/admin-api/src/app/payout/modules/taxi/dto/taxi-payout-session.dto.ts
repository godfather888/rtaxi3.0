import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Authorize,
  FilterableField,
  IDField,
  OffsetConnection,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { PayoutSessionStatus } from '@ridy/database';
import { TaxiPayoutSessionPayoutMethodDetailDTO } from './taxi-payout-session-payout-method-detail.dto';
import { DriverTransactionDTO } from '../../../../driver/dto/driver-transaction.dto';
import { PayoutMethodDTO } from '../../../dto/payout-method.dto';
import { PayoutAuthorizer } from '../../../payout.authorizer';

@ObjectType('TaxiPayoutSession')
@OffsetConnection('driverTransactions', () => DriverTransactionDTO, {
  enableAggregate: true,
})
@UnPagedRelation(
  'payoutMethodDetails',
  () => TaxiPayoutSessionPayoutMethodDetailDTO,
)
@UnPagedRelation('payoutMethods', () => PayoutMethodDTO)
@Authorize(PayoutAuthorizer)
export class TaxiPayoutSessionDTO {
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
