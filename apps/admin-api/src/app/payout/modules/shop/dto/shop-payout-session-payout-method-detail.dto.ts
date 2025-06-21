import { ID, ObjectType, Field } from '@nestjs/graphql';
import {
  IDField,
  OffsetConnection,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { PayoutSessionStatus } from '@ridy/database';
import { PayoutMethodDTO } from '../../../dto/payout-method.dto';
import { ShopTransactionDTO } from '../../../../shop/dto/shop-transaction.dto';

@ObjectType('ShopPayoutSessionPayoutMethodDetail')
@Relation('payoutMethod', () => PayoutMethodDTO)
@OffsetConnection('shopTransactions', () => ShopTransactionDTO, {
  enableAggregate: true,
})
export class ShopPayoutSessionPayoutMethodDetailDTO {
  @IDField(() => ID)
  id: number;

  @Field(() => PayoutSessionStatus, { nullable: false })
    status: PayoutSessionStatus;
}
