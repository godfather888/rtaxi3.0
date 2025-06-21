import {
  Authorize,
  FilterableField,
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import {
  Field,
  ID,
  Int,
  ObjectType,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { OrderStatus } from '@ridy/database';
import { UserContext } from '../../auth/authenticated-user';
import { RiderDTO } from './rider.dto';
import { ServiceDTO } from '../../service/dto/service.dto';
import { OrderMessageDTO } from '../../chat/dto/order-message.dto';
import { DriverDTO } from '../../driver/dto/driver.dto';
import { ServiceOptionDTO } from './service-option.dto';
import { PaymentGatewayDTO } from '../../wallet/dto/payment-gateway.dto';
import { SavedPaymentMethodDto } from '../../wallet/dto/saved-payment-method.dto';
import { PaymentMode } from '@ridy/database';
import { TaxiOrderType } from '@ridy/database';
import { DeliveryContactDTO } from '../../core/fragments/delivery-contact.dto';

@ObjectType('Order')
@Authorize({
  authorize: (context: UserContext) =>
    ({ driverId: { eq: context.req.user.id } }) as unknown as any,
})
@Relation('driver', () => DriverDTO, {
  nullable: true,
})
@Relation('rider', () => RiderDTO, {
  nullable: true,
})
@Relation('service', () => ServiceDTO, {
  nullable: true,
})
@Relation('paymentGateway', () => PaymentGatewayDTO, {
  nullable: true,
})
@Relation('savedPaymentMethod', () => SavedPaymentMethodDto, {
  nullable: true,
})
@UnPagedRelation('options', () => ServiceOptionDTO)
@UnPagedRelation('conversation', () => OrderMessageDTO, {
  relationName: 'conversation',
})
export class OrderDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField(() => OrderStatus, { nullable: false })
  status!: OrderStatus;
  @Field(() => TaxiOrderType, { nullable: false })
  type!: TaxiOrderType;
  @FilterableField(() => GraphQLISODateTime, { nullable: false })
  createdOn!: Date;
  @FilterableField(() => Int)
  distanceBest!: number;
  @Field(() => Int)
  durationBest!: number;
  @Field(() => GraphQLISODateTime, { nullable: true })
  startTimestamp?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  finishTimestamp?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  etaPickup?: Date;
  @Field(() => Float, { nullable: false })
  waitMinutes!: number;
  @Field(() => Float, { nullable: false })
  waitCost!: number;
  @Field(() => Float, { nullable: false })
  rideOptionsCost!: number;
  @Field(() => Float, { nullable: false })
  taxCost!: number;
  @Field(() => Float, { nullable: false })
  serviceCost!: number;
  @Field(() => Int, { nullable: true })
  destinationArrivedTo?: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
  driverLastSeenMessagesAt!: Date;
  @Field(() => GraphQLISODateTime, { nullable: false })
  riderLastSeenMessagesAt!: Date;
  @Field(() => DeliveryContactDTO, { nullable: true })
  senderContact?: DeliveryContactDTO;
  @Field(() => DeliveryContactDTO, { nullable: true })
  receiverContact?: DeliveryContactDTO;
  @Field(() => GraphQLISODateTime, { nullable: false })
  expectedTimestamp!: Date;
  @FilterableField(() => Float, { nullable: false })
  costBest!: number;
  @Field(() => Float, { nullable: false })
  costAfterCoupon!: number;
  @Field(() => Float, { nullable: false })
  providerShare!: number;
  @Field(() => Float, { nullable: false })
  paidAmount!: number;
  @Field(() => String, { nullable: false })
  currency!: string;
  @FilterableField(() => ID, { nullable: true, filterOnly: true })
  driverId?: number;
  @Field(() => [String], { nullable: false })
  addresses!: string[];
  @Field(() => [Point], { nullable: false })
  points!: Point[];
  @Field(() => Float, { nullable: false })
  tipAmount!: number;
  @Field(() => PaymentMode, { nullable: true })
  paymentMode?: PaymentMode;
  @FilterableField(() => ID, { nullable: true })
  paymentGatewayId?: number;
  @FilterableField(() => ID, { nullable: true })
  paymentMethodId?: number;
  @Field(() => [Point], { nullable: true })
  directions?: Point[];
  @Field(() => [Point], { nullable: true })
  driverDirections?: Point[];
}
