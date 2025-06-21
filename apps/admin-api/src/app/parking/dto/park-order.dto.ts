import { Float, GraphQLISODateTime, ID, ObjectType, Field } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ParkOrderStatus } from '@ridy/database';
import { ParkSpotDTO } from './park-spot.dto';
import { CustomerDTO } from '../../customer/dto/customer.dto';
import { ParkSpotVehicleType } from '@ridy/database';
import { ParkSpotCarSize } from '@ridy/database';
import { PaymentMode } from '@ridy/database';
import { PaymentGatewayDTO } from '../../payment-gateway/dto/payment-gateway.dto';
import { SavedPaymentMethodDTO } from '../../customer/dto/saved-payment-method.dto';
import { ParkOrderNoteDTO } from './park-order-note.dto';
import { RiderTransactionDTO } from '../../customer/dto/rider-transaction.dto';
import { ProviderTransactionDTO } from '../../accounting/dto/provider-transaction.dto';
import { ParkOrderActivityDTO } from './park-order-activity.dto';
import { ParkingFeedbackDTO } from '../modules/feedback/dto/parking-feedback.dto';

@ObjectType('ParkOrder')
// @Authorize({
//   authorize: (context: UserContext) => ({
//     carOwnerId: { eq: context.req.user.id },
//   }),
// })
@Relation('parkSpot', () => ParkSpotDTO)
@Relation('spotOwner', () => CustomerDTO, { nullable: true })
@Relation('carOwner', () => CustomerDTO, { nullable: true })
@Relation('paymentGateway', () => PaymentGatewayDTO, { nullable: true })
@Relation('savedPaymentMethod', () => SavedPaymentMethodDTO, { nullable: true })
@UnPagedRelation('notes', () => ParkOrderNoteDTO)
@UnPagedRelation('feedbacks', () => ParkingFeedbackDTO)
@UnPagedRelation('customerTransactions', () => RiderTransactionDTO)
@UnPagedRelation('parkOwnerTransactions', () => RiderTransactionDTO)
@UnPagedRelation('providerTransactions', () => ProviderTransactionDTO)
@UnPagedRelation('activities', () => ParkOrderActivityDTO)
export class ParkOrderDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
    createdAt: Date;
  @FilterableField(() => GraphQLISODateTime)
  enterTime: Date;
  @FilterableField(() => GraphQLISODateTime)
  exitTime: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
    extendedExitTime?: Date;
  @FilterableField(() => ParkSpotVehicleType)
  vehicleType: ParkSpotVehicleType;
  @FilterableField(() => ParkSpotCarSize, { nullable: true })
  carSize?: ParkSpotCarSize;
  @FilterableField(() => PaymentMode)
  paymentMethod: PaymentMode;
  @FilterableField(() => ID)
  parkSpotId: number;
  @FilterableField(() => Float)
  price!: number;
  @FilterableField()
  currency: string;
  @FilterableField(() => ParkOrderStatus)
  status: ParkOrderStatus;
  @FilterableField(() => ID)
  carOwnerId: number;
}
