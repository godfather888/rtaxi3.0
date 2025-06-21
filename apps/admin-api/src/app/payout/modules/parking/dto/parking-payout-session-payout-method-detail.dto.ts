import { ID, ObjectType, Field } from '@nestjs/graphql';
import {
  IDField,
  OffsetConnection,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { PayoutSessionStatus } from '@ridy/database';
import { PayoutMethodDTO } from '../../../dto/payout-method.dto';
import { ParkingTransactionDTO } from '../../../../parking/dto/parking-transaction.dto';

@ObjectType('ParkingPayoutSessionPayoutMethodDetail')
@Relation('payoutMethod', () => PayoutMethodDTO)
@OffsetConnection('parkingTransactions', () => ParkingTransactionDTO, {
  enableAggregate: true,
})
export class ParkingPayoutSessionPayoutMethodDetailDTO {
  @IDField(() => ID)
  id: number;

  @Field(() => PayoutSessionStatus, { nullable: false })
    status: PayoutSessionStatus;
}
