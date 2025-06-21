import { Field, Float, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableUnPagedRelation,
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ShopOrderCartDTO } from './shop-order-cart.dto';
import { PaymentMode } from '@ridy/database';
import { PaymentGatewayDTO } from '../../payment-gateway/dto/payment-gateway.dto';
import { SavedPaymentMethodDTO } from '../../customer/dto/saved-payment-method.dto';
import { ShopOrderStatus } from '@ridy/database';
import { AddressDTO } from '../../address/dto/address.dto';
import { CustomerDTO } from '../../customer/dto/customer.dto';
import { DriverTransactionDTO } from '../../driver/dto/driver-transaction.dto';
import { RiderTransactionDTO } from '../../customer/dto/rider-transaction.dto';
import { ShopOrderStatusHistoryDTO } from './shop-order-status-history.dto';
import { DeliveryMethod } from '@ridy/database';
import { Point } from '@ridy/database';

@ObjectType('ShopOrder')
@FilterableUnPagedRelation('carts', () => ShopOrderCartDTO)
@Relation('paymentGateway', () => PaymentGatewayDTO, { nullable: true })
@Relation('savedPaymentMethod', () => SavedPaymentMethodDTO, { nullable: true })
@Relation('deliveryAddress', () => AddressDTO)
@Relation('customer', () => CustomerDTO)
@UnPagedRelation('riderTransactions', () => RiderTransactionDTO)
@UnPagedRelation('driverTransactions', () => DriverTransactionDTO)
@UnPagedRelation('statusHistories', () => ShopOrderStatusHistoryDTO)
export class ShopOrderDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField()
  createdAt: Date;
  @FilterableField(() => ShopOrderStatus)
  status: ShopOrderStatus;
  @Field(() => Float, { nullable: false })
    subTotal: number;
  @FilterableField()
  currency: string;
  @Field(() => Float, { nullable: false })
    deliveryFee: number;
  @FilterableField(() => DeliveryMethod)
  deliveryMethod: DeliveryMethod;
  @Field(() => [Point], { nullable: true })
  deliveryDirections?: Point[];
  @FilterableField(() => PaymentMode)
  paymentMethod: PaymentMode;
  @FilterableField(() => ID)
  customerId: number;
  @Field(() => Float, { nullable: false })
    tax: number;
  @Field(() => Float, { nullable: false })
    discount: number;
  @Field(() => Float, { nullable: false })
    serviceFee: number;
  @FilterableField(() => Float)
  total: number;
  @Field(() => GraphQLISODateTime, { nullable: true })
    estimatedDeliveryTime?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
    fullfillmentTime?: Date;
}
