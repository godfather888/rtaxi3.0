import {
  FilterableField,
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { OrderStatus } from '@ridy/database';

import { ProviderTransactionDTO } from '../../accounting/dto/provider-transaction.dto';
import { TaxiSupportRequestDTO } from '../../taxi-support-request/dto/taxi-support-request.dto';
import { CouponDTO } from '../../coupon/dto/coupon.dto';
import { DriverTransactionDTO } from '../../driver/dto/driver-transaction.dto';
import { DriverDTO } from '../../driver/dto/driver.dto';
import { FleetTransactionDTO } from '../../fleet/dto/fleet-transaction.dto';
import { RiderTransactionDTO } from '../../customer/dto/rider-transaction.dto';
import { CustomerDTO } from '../../customer/dto/customer.dto';
import { ServiceDTO } from '../../service/dto/service.dto';
import { OrderMessageDTO } from './order-message.dto';
import { RequestActivityDTO } from './request-activity.dto';
import { PaymentMode } from '@ridy/database';
import { PaymentGatewayDTO } from '../../payment-gateway/dto/payment-gateway.dto';
import { SavedPaymentMethodDTO } from '../../customer/dto/saved-payment-method.dto';
import { FleetDTO } from '../../fleet/dto/fleet.dto';
import { ServiceOptionDTO } from '../../service/dto/service-option.dto';

@ObjectType('Order')
@Relation('driver', () => DriverDTO, { nullable: true })
@Relation('rider', () => CustomerDTO, { nullable: true })
@Relation('service', () => ServiceDTO, { nullable: true })
@Relation('coupon', () => CouponDTO, { nullable: true })
@Relation('paymentGateway', () => PaymentGatewayDTO, { nullable: true })
@Relation('savedPaymentMethod', () => SavedPaymentMethodDTO, { nullable: true })
@UnPagedRelation('complaints', () => TaxiSupportRequestDTO)
@UnPagedRelation('conversation', () => OrderMessageDTO, {
  relationName: 'conversation',
})
@UnPagedRelation('riderTransactions', () => RiderTransactionDTO)
@UnPagedRelation('driverTransactions', () => DriverTransactionDTO)
@UnPagedRelation('fleetTransactions', () => FleetTransactionDTO)
@UnPagedRelation('providerTransactions', () => ProviderTransactionDTO)
@UnPagedRelation('activities', () => RequestActivityDTO)
@Relation('fleet', () => FleetDTO, { nullable: true })
@UnPagedRelation('options', () => ServiceOptionDTO)
export class OrderDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField()
  createdOn!: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  startTimestamp?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  finishTimestamp?: Date;
  @FilterableField(() => OrderStatus)
  status!: OrderStatus;
  @FilterableField(() => Int)
  distanceBest!: number;
  @FilterableField(() => Int)
  durationBest!: number;
  @FilterableField(() => Float)
  costBest!: number;
  @FilterableField(() => Float)
  costAfterCoupon!: number;
  @Field(() => Float, { nullable: false })
  waitCost!: number;
  @Field(() => Float, { nullable: false })
  rideOptionsCost!: number;
  @Field(() => Float, { nullable: false })
  taxCost!: number;
  @Field(() => Float, { nullable: false })
  serviceCost!: number;
  @FilterableField()
  currency!: string;
  @Field(() => Int)
  destinationArrivedTo!: number;
  @Field(() => Float, { nullable: false })
  waitMinutes!: number;
  @Field(() => [String], { nullable: false })
  addresses!: string[];
  @Field(() => [Point], { nullable: false })
  points!: Point[];
  @Field(() => GraphQLISODateTime, { nullable: true })
  expectedTimestamp?: Date;
  @FilterableField(() => ID)
  riderId!: number;
  @FilterableField(() => PaymentMode, { nullable: true })
  paymentMode?: PaymentMode;
  @FilterableField(() => ID, { nullable: true })
  driverId?: number;
  @FilterableField(() => ID, { nullable: true })
  regionId?: number;
  @FilterableField(() => ID, { nullable: true })
  fleetId?: number;
  @FilterableField(() => ID, { nullable: true })
  serviceId?: number;
  @Field(() => [Point], { nullable: true })
  directions?: Point[];
}
