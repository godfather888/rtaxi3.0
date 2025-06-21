import {
  FilterableField,
  IDField,
  OffsetConnection,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import {
  Field,
  ID,
  Int,
  ObjectType,
  GraphQLISODateTime,
  Float,
} from '@nestjs/graphql';
import { DriverStatus } from '@ridy/database';
import { Gender } from '@ridy/database';
import { FeedbackDTO } from '../../feedback/dto/feedback.dto';
import { numberMasker } from '../../number.masker.middleware';
import { OrderDTO } from '../../order/dto/order.dto';
import { MediaDTO } from '../../upload/media.dto';
import { DriverTransactionDTO } from './driver-transaction.dto';
import { DriverWalletDTO } from './driver-wallet.dto';
import { PayoutAccountDTO } from '../../payout/dto/payout-account.dto';
import { DriverSessionDTO } from './driver-session.dto';
import { DeliveryPackageSize } from '@ridy/database';
import { DriverToDriverDocumentDTO } from '../../driver-document/dto/driver-to-driver-document.dto';
import { DriverServicesServiceDTO } from './driver-services-service.dto';

@ObjectType('Driver')
@OffsetConnection('feedbacks', () => FeedbackDTO, { enableAggregate: true })
@UnPagedRelation('wallet', () => DriverWalletDTO, { relationName: 'wallet' })
@UnPagedRelation('sessions', () => DriverSessionDTO)
@UnPagedRelation('enabledServices', () => DriverServicesServiceDTO)
@UnPagedRelation('driverToDriverDocuments', () => DriverToDriverDocumentDTO)
@OffsetConnection('transactions', () => DriverTransactionDTO)
@OffsetConnection('orders', () => OrderDTO)
@Relation('media', () => MediaDTO, { nullable: true })
@OffsetConnection('payoutAccounts', () => PayoutAccountDTO)
export class DriverDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField(() => ID, { nullable: true })
  fleetId?: number;
  @Field(() => String, { nullable: true })
  firstName?: string;
  @FilterableField(() => String, { nullable: true })
  lastName?: string;
  @FilterableField(() => String, { middleware: [numberMasker] })
  mobileNumber!: string;
  @Field(() => String, { nullable: true })
  countryIso?: string;
  @Field(() => String, { nullable: true })
  certificateNumber?: string;
  @Field(() => Boolean, { nullable: false })
  canDeliver!: boolean;
  @FilterableField(() => DeliveryPackageSize)
  maxDeliveryPackageSize!: DeliveryPackageSize;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => Int, { nullable: true })
  carProductionYear?: number;
  @FilterableField(() => ID, { nullable: true })
  carId?: number;
  @FilterableField(() => ID, { nullable: true })
  carColorId?: number;
  @Field(() => String, { nullable: true })
  carPlate?: string;
  @FilterableField(() => DriverStatus)
  status!: DriverStatus;
  @FilterableField(() => Gender, { nullable: true })
  gender?: Gender;
  @FilterableField(() => Int, { nullable: true })
  rating?: number;
  @FilterableField(() => Int)
  reviewCount!: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
  registrationTimestamp!: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  lastSeenTimestamp?: Date;
  @Field(() => String, { nullable: true })
  accountNumber?: string;
  @Field(() => String, { nullable: true })
  bankName?: string;
  @Field(() => String, { nullable: true })
  bankRoutingNumber?: string;
  @Field(() => String, { nullable: true })
  bankSwift?: string;
  @Field(() => String, { nullable: true })
  address?: string;
  @Field(() => String, { nullable: true })
  softRejectionNote?: string;
  @Field(() => ID, { nullable: true })
  mediaId?: number;
}
