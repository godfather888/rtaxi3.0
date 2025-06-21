import { ID, ObjectType, Field } from '@nestjs/graphql';
import {
  IDField,
  OffsetConnection,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { PayoutSessionStatus } from '@ridy/database';
import { PayoutMethodDTO } from '../../../dto/payout-method.dto';
import { DriverTransactionDTO } from '../../../../driver/dto/driver-transaction.dto';

@ObjectType('TaxiPayoutSessionPayoutMethodDetail')
@Relation('payoutMethod', () => PayoutMethodDTO)
@OffsetConnection('driverTransactions', () => DriverTransactionDTO, {
  enableAggregate: true,
})
export class TaxiPayoutSessionPayoutMethodDetailDTO {
  @IDField(() => ID)
  id: number;

  @Field(() => PayoutSessionStatus, { nullable: false })
    status: PayoutSessionStatus;
}
