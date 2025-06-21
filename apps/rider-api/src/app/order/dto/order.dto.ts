import {
  Authorize,
  FilterableField,
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import {
  Field,
  Float,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { OrderStatus } from '@ridy/database';

import { UserContext } from '../../auth/authenticated-user';
import { OrderMessageDTO } from '../../chat/dto/order-message.dto';
import { RiderDTO } from '../../rider/dto/rider.dto';
import { ServiceOptionDTO } from '../../service/dto/service-option.dto';
import { ServiceDTO } from '../../service/dto/service.dto';
import { PaymentGatewayDTO } from '../../wallet/dto/payment-gateway.dto';
import { DriverDTO } from './driver.dto';
import { SavedPaymentMethodDto } from '../../wallet/dto/saved-payment-method.dto';
import { PaymentMode } from '@ridy/database';
import { TaxiOrderType } from '@ridy/database';
import { DeliveryContactDTO } from '../../core/fragments/delivery-contact.dto';
import { TaxiOrderShopDTO } from './taxi-order-shop.dto';

@ObjectType('Order')
@Authorize({
  authorize: (context: UserContext) => ({
    riderId: { eq: context.req.user.id },
  }),
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
@UnPagedRelation('options', () => ServiceOptionDTO)
@Relation('paymentGateway', () => PaymentGatewayDTO, {
  nullable: true,
})
@Relation('savedPaymentMethod', () => SavedPaymentMethodDto, {
  nullable: true,
})
@UnPagedRelation('conversation', () => OrderMessageDTO, {
  relationName: 'conversation',
})
@UnPagedRelation('shopCarts', () => TaxiOrderShopDTO)
export class OrderDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField(() => OrderStatus, { nullable: false })
  status!: OrderStatus;
  @FilterableField(() => TaxiOrderType, { nullable: false })
  type!: TaxiOrderType;
  @FilterableField(() => GraphQLISODateTime, { nullable: false })
  createdOn!: Date;
  @FilterableField(() => Int, { nullable: false })
  distanceBest!: number;
  @Field(() => Int, { nullable: false })
  durationBest!: number;
  @Field(() => Int, { nullable: false })
  waitMinutes!: number;
  @Field(() => Int, { nullable: false })
  waitCost!: number;
  @Field(() => Int, { nullable: false })
  rideOptionsCost!: number;
  @Field(() => DeliveryContactDTO, { nullable: true })
  senderContact?: DeliveryContactDTO;
  @Field(() => DeliveryContactDTO, { nullable: true })
  receiverContact?: DeliveryContactDTO;
  @Field(() => Float, { nullable: false })
  taxCost!: number;
  @Field(() => Float, { nullable: false })
  serviceCost!: number;
  @Field(() => [Point], { nullable: false })
  points!: Point[];
  @Field(() => [String], { nullable: false })
  addresses!: string[];
  @Field(() => GraphQLISODateTime, { nullable: false })
  expectedTimestamp!: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  driverLastSeenMessagesAt!: Date;
  @Field(() => GraphQLISODateTime, { nullable: false })
  riderLastSeenMessagesAt!: Date;
  @Field(() => Int, { nullable: false })
  destinationArrivedTo!: number;
  @Field(() => GraphQLISODateTime, { nullable: true })
  startTimestamp?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  finishTimestamp?: Date;
  @FilterableField(() => ID, { nullable: false })
  riderId!: number;
  @FilterableField(() => ID, { nullable: true })
  driverId?: number;
  @Field(() => Float, { nullable: false })
  costAfterCoupon!: number;
  @Field(() => PaymentMode, { nullable: true })
  paymentMode?: PaymentMode;
  @FilterableField(() => ID, { nullable: true })
  paymentGatewayId?: number;
  @FilterableField(() => ID, { nullable: true })
  paymentMethodId?: number;
  @Field(() => GraphQLISODateTime, { nullable: true })
  etaPickup?: Date;
  @Field(() => Float, { nullable: false })
  costBest!: number;
  @Field(() => Float, { nullable: false })
  paidAmount!: number;
  @Field(() => Float, { nullable: false })
  tipAmount!: number;
  @Field(() => Float, { nullable: false })
  providerShare!: number;
  @Field(() => String, { nullable: false })
  currency!: string;
  @Field(() => [Point], { nullable: true })
  directions?: Point[];
  @Field(() => [Point], { nullable: true })
  driverDirections?: Point[];
}
