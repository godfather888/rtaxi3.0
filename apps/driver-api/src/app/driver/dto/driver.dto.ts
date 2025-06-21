import {
  Field,
  ID,
  Int,
  ObjectType,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import {
  Authorize,
  BeforeFindOne,
  BeforeUpdateOne,
  FindOneArgsType,
  IDField,
  OffsetConnection,
  Relation,
  UnPagedRelation,
  UpdateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { Gender } from '@ridy/database';
import { DriverStatus } from '@ridy/database';
import { UserContext } from '../../auth/authenticated-user';
import { CarModelDTO } from './car-model.dto';
import { CarColorDTO } from './car-color.dto';
import { OrderDTO } from '../../order/dto/order.dto';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { OrderStatus } from '@ridy/database';
import { MediaDTO } from '../../upload/media.dto';
import { DriverWalletDTO } from '../../wallet/dto/driver-wallet.dto';
import { Logger } from '@nestjs/common';
import { SavedPaymentMethodDto } from '../../wallet/dto/saved-payment-method.dto';
import { DriverTransactionDTO } from '../../wallet/dto/driver-transaction.dto';
import { DriverServicesServiceDTO } from './driver-services-service.dto';

@ObjectType('Driver')
@Authorize({
  authorize: (context: UserContext) => ({ id: { eq: context.req.user.id } }),
})
@BeforeFindOne((input: FindOneArgsType, context: UserContext) => {
  return { id: context.req.user.id };
})
@BeforeUpdateOne((input: UpdateOneInputType<unknown>, context: UserContext) => {
  return { id: context.req.user.id, update: input.update };
})
@UnPagedRelation('documents', () => MediaDTO, {
  update: { enabled: true },
  nullable: true,
})
@Relation('car', () => CarModelDTO, {
  nullable: true,
})
@Relation('carColor', () => CarColorDTO, {
  nullable: true,
})
@Relation('media', () => MediaDTO, {
  nullable: true,
})
@OffsetConnection('historyOrders', () => OrderDTO, {
  relationName: 'orders',
  enableAggregate: true,
})
@UnPagedRelation('savedPaymentMethods', () => SavedPaymentMethodDto)
@OffsetConnection('orders', () => OrderDTO, {
  maxResultsSize: 1,
  defaultFilter: {
    status: {
      in: [
        OrderStatus.DriverAccepted,
        OrderStatus.Arrived,
        OrderStatus.Started,
        OrderStatus.WaitingForPostPay,
      ],
    },
  },
  defaultSort: [{ field: 'id', direction: SortDirection.DESC }],
  defaultResultSize: 1,
}) // This is essentially same as currentOrders and should be phased out. In most build prior to v2.3.x the chat feature relied on this
@UnPagedRelation('currentOrders', () => OrderDTO, {
  maxResultsSize: 1,
  defaultFilter: {
    status: {
      in: [
        OrderStatus.DriverAccepted,
        OrderStatus.Arrived,
        OrderStatus.Started,
        OrderStatus.WaitingForPostPay,
      ],
    },
  },
  defaultSort: [{ field: 'id', direction: SortDirection.DESC }],
  defaultResultSize: 1,
  relationName: 'orders',
})
@UnPagedRelation('enabledServices', () => DriverServicesServiceDTO)
@OffsetConnection('transactions', () => DriverTransactionDTO)
@UnPagedRelation('wallet', () => DriverWalletDTO, {
  relationName: 'wallet',
})
export class DriverDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, { nullable: true })
  firstName?: string;
  @Field(() => String, { nullable: true })
  lastName?: string;
  @Field(() => String, { nullable: false })
  mobileNumber!: string;
  @Field(() => String, { nullable: true })
  certificateNumber?: string;
  @Field(() => String, { nullable: true })
  countryIso?: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => Int, { nullable: true })
  carProductionYear?: number;
  @Field(() => String, { nullable: true })
  carPlate?: string;
  @Field(() => DriverStatus, { nullable: false })
  status!: DriverStatus;
  @Field(() => Gender, { nullable: true })
  gender?: Gender;
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
  @Field(() => Int, { nullable: true })
  presetAvatarNumber?: number;
  @Field(() => String, { nullable: true })
  softRejectionNote?: string;
  @Field(() => ID, { nullable: true })
  carId?: number;
  @Field(() => ID, {
    description:
      'arbitary field to prevent exception. The correct field is carId',
    defaultValue: null,
  })
  carModelId?: number;
  @Field(() => ID, { nullable: true })
  carColorId?: number;
  @Field(() => Int, { nullable: true })
  searchDistance?: number;
  @Field(() => Float, { nullable: true })
  rating?: number;
  @Field(() => Boolean, {
    middleware: [
      (ctx) => {
        if (process.env.HIDDEN_WALLETS == null) return false;
        Logger.log(
          `looking for hidden wallet ${process.env.HIDDEN_WALLETS.split(
            ',',
          ).includes(ctx.context.req.user.id.toString())}`,
        );
        return process.env.HIDDEN_WALLETS.split(',').includes(
          ctx.context.req.user.id.toString(),
        );
      },
    ],
  })
  isWalletHidden!: boolean;
}
