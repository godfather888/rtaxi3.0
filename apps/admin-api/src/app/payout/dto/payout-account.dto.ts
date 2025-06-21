import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { SavedPaymentMethodType } from '@ridy/database';
import { PayoutMethodDTO } from './payout-method.dto';

@ObjectType('PayoutAccount')
@Relation('payoutMethod', () => PayoutMethodDTO)
export class PayoutAccountDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => String, { nullable: false })
    name: string;
  @Field(() => SavedPaymentMethodType, { nullable: false })
    type: SavedPaymentMethodType;
  @Field(() => String, { nullable: false })
    last4: string;
  @Field(() => String, { nullable: false })
    currency: string;
  @Field(() => ID)
    payoutMethodId: number;
  @FilterableField()
  isDefault: true;
  @Field(() => String, { nullable: true })
    accountNumber?: string;
  @Field(() => String, { nullable: true })
    routingNumber?: string;
  @Field(() => String, { nullable: true })
    accountHolderName?: string;
  @Field(() => String, { nullable: true })
    bankName?: string;
  @Field(() => String, { nullable: true })
    branchName?: string;
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
  @Field(() => Boolean, { nullable: false })
    isVerified!: boolean;
}
