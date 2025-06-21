import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Authorize,
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { PaymentGatewayDTO } from '../../wallet/dto/payment-gateway.dto';
import { GatewayLinkMethod } from '@ridy/database';
import { PayoutMethodDTO } from './payout-method.dto';

@ObjectType('PayoutAccount')
@Relation('paymentGateway', () => PaymentGatewayDTO, {
  nullable: true,
  description: 'Deprecated in favor of payout method relation',
})
@Relation('payoutMethod', () => PayoutMethodDTO)
@Authorize({
  authorize: (context) => ({
    driverId: { eq: context.req.user.id },
  }),
})
export class PayoutAccountDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  accountNumber?: string;
  @Field(() => String, { nullable: true })
  routingNumber?: string;
  @Field(() => String, { nullable: true })
  bankName?: string;
  @Field(() => String, { nullable: true })
  accountHolderName?: string;
  @Field(() => String, { nullable: true })
  branchName?: string;
  @Field(() => Boolean, { nullable: false })
  isDefault!: boolean;
  @Field(() => String, { nullable: true })
  accountHolderAddress?: string;
  @Field(() => String, { nullable: true })
  accountHolderCity?: string;
  @Field(() => String, { nullable: true })
  accountHolderState?: string;
  @Field(() => String, { nullable: true })
  accountHolderZip?: string;
  @Field(() => String, { nullable: true })
  accountHolderCountry?: string;
  @Field(() => String, { nullable: true })
  accountHolderPhone?: string;
  @Field(() => GraphQLISODateTime, { nullable: true })
  accountHolderDateOfBirth?: Date;
  @FilterableField(() => ID, { filterOnly: true })
  @Field(() => ID)
  driverId!: number;
  @Field(() => GatewayLinkMethod, { nullable: true })
  linkType?: GatewayLinkMethod;
}
