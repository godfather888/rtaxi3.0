import {
  FilterableField,
  IDField,
  OffsetConnection,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Gender } from '@ridy/database';
import { RiderStatus } from '@ridy/database';
import { numberMasker } from '../../number.masker.middleware';
import { OrderDTO } from '../../order/dto/order.dto';
import { MediaDTO } from '../../upload/media.dto';
import { RiderAddressDTO } from './rider-address.dto';
import { RiderTransactionDTO } from './rider-transaction.dto';
import { RiderWalletDTO } from './rider-wallet.dto';
import { ParkingWalletDTO } from '../../parking/dto/parking-wallet.dto';

@ObjectType('Rider')
@OffsetConnection('addresses', () => RiderAddressDTO)
@UnPagedRelation('wallet', () => RiderWalletDTO, { relationName: 'wallets' })
@UnPagedRelation('parkingWallets', () => ParkingWalletDTO)
@OffsetConnection('transactions', () => RiderTransactionDTO)
@OffsetConnection('orders', () => OrderDTO, { enableAggregate: true })
@Relation('media', () => MediaDTO, { nullable: true })
export class CustomerDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField(() => RiderStatus)
  status!: RiderStatus;
  @FilterableField(() => String, { nullable: true })
  firstName?: string;
  @FilterableField(() => String, { nullable: true })
  lastName?: string;
  @Field(() => String, {
    nullable: true,
    description:
      'Country ISO code. For example "GB" for United Kingdom, "CA" for Canada, "AU" for Australia, etc.',
  })
  countryIso?: string;
  @Field(() => GraphQLISODateTime, { nullable: true })
  lastActivityAt?: Date;
  @FilterableField(() => String, { middleware: [numberMasker] })
  mobileNumber: string;
  @Field(() => GraphQLISODateTime, { nullable: false })
  registrationTimestamp: Date;
  @Field(() => String, { nullable: true })
  email?: string;
  @FilterableField(() => Gender, { nullable: true })
  gender?: Gender;
  @Field(() => Boolean, { nullable: true })
  isResident?: boolean;
  @Field(() => String, { nullable: true })
  idNumber?: string;
}
