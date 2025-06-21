import {
  Authorize,
  FilterableField,
  IDField,
  OffsetConnection,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import {
  ID,
  ObjectType,
  Field,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { ZonePriceDTO } from '../../zone_price/dto/zone-price.dto';
import { FleetTransactionDTO } from './fleet-transaction.dto';
import { FleetWalletDTO } from './fleet-wallet.dto';
import { FleetAuthorizer } from './fleet.authorizer';
import { DriverDTO } from '../../driver/dto/driver.dto';
import { MediaDTO } from '../../upload/media.dto';

@ObjectType('Fleet')
@UnPagedRelation('wallet', () => FleetWalletDTO, { relationName: 'wallet' })
@OffsetConnection('transactions', () => FleetTransactionDTO)
@OffsetConnection('zonePrices', () => ZonePriceDTO)
@Relation('profilePicture', () => MediaDTO, { nullable: true })
@OffsetConnection('drivers', () => DriverDTO, { enableAggregate: true })
@Authorize(FleetAuthorizer)
export class FleetDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField()
  name!: string;
  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;
  @Field(() => Boolean, { nullable: false })
  isBlocked!: boolean;
  @Field(() => String, { nullable: false })
  phoneNumber: string;
  @Field(() => String, { nullable: false })
  mobileNumber: string;
  @Field(() => String, { nullable: true })
  userName?: string;
  @Field(() => String, { nullable: true })
  password?: string;
  @Field(() => String, { nullable: false })
  accountNumber: string;
  @Field(() => Float, { nullable: false })
  commissionSharePercent!: number;
  @Field(() => Float, { nullable: false })
  commissionShareFlat!: number;
  @Field(() => Float, { nullable: true })
  feeMultiplier?: number;
  @Field(() => String, { nullable: true })
  address?: string;
  @Field(() => [[Point]], { nullable: true })
  exclusivityAreas?: Point[][];
}
