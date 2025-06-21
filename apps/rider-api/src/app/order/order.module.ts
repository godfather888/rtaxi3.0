import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisPubSubProvider } from '@ridy/database';
import { CarColorEntity } from '@ridy/database';
import { CarModelEntity } from '@ridy/database';
import { DriverTransactionEntity } from '@ridy/database';
import { DriverWalletEntity } from '@ridy/database';
import { DriverEntity } from '@ridy/database';
import { TaxiOrderEntity } from '@ridy/database';
import { ProviderTransactionEntity } from '@ridy/database';
import { ProviderWalletEntity } from '@ridy/database';
import { RegionEntity } from '@ridy/database';
import { ServiceCategoryEntity } from '@ridy/database';
import { SharedDriverService } from '@ridy/database';
import { DriverNotificationService } from '@ridy/database';
import { GoogleServicesModule } from '@ridy/database';
import { SharedProviderService } from '@ridy/database';
import { RegionModule } from '@ridy/database';
import { RedisHelpersModule } from '@ridy/database';

import { GqlAuthGuard } from '../auth/access-token.guard';
import { RiderModule } from '../rider/rider.module';
import { ServiceModule } from '../service/service.module';
import { CarColorDTO } from './dto/car-color.dto';
import { CarModelDTO } from './dto/car-model.dto';
import { DriverDTO } from './dto/driver.dto';
import { OrderDTO } from './dto/order.dto';
import { OrderResolver } from './order.resolver';
import { RiderOrderService } from './rider-order.service';
import { FeedbackEntity } from '@ridy/database';
import { OrderSubscriptionService } from './order-subscription.service';
import { MediaEntity } from '@ridy/database';
import { RequestActivityEntity } from '@ridy/database';
import { SharedOrderModule } from '@ridy/database';
import { RiderNotificationService } from '@ridy/database';
import { CouponModule } from '../coupon/coupon.module';
import { FeedbackParameterEntity } from '@ridy/database';
import { FeedbackParameterDTO } from './dto/feedback-parameter.dto';
import { ServiceOptionEntity } from '@ridy/database';
import { UpdateOrderInput } from './dto/update-order.input';
import { RiderOrderQueryService } from './rider-order.query-service';
import { OrderRedisService } from '@ridy/database';
import { CommonCouponModule } from '@ridy/database';
import { ZonePriceEntity } from '@ridy/database';
import { PaymentEntity } from '@ridy/database';
import { HttpModule } from '@nestjs/axios';
import { OrderCancelReasonEntity } from '@ridy/database';
import { OrderCancelReasonDTO } from './dto/cancel-reason.dto';
import { SharedCustomerWalletModule } from '@ridy/database';
import { ShopOrderCartEntity } from '@ridy/database';
import { ShopOrderCartDTO } from './dto/shop-order-cart.dto';
import { ShopEntity } from '@ridy/database';
import { ShopDTO } from './dto/shop.dto';
import { TaxiOrderShopEntity } from '@ridy/database';
import { TaxiOrderShopDTO } from './dto/taxi-order-shop.dto';
import { DriverServicesServiceDTO } from './dto/driver-services-service.dto';
import { DriverServicesServiceEntity } from '@ridy/database';

@Module({
  imports: [
    SharedCustomerWalletModule,
    TypeOrmModule.forFeature([
      TaxiOrderEntity,
      ProviderWalletEntity,
      ProviderTransactionEntity,
      DriverEntity,
      DriverWalletEntity,
      DriverTransactionEntity,
      FeedbackEntity,
      RequestActivityEntity,
      FeedbackParameterEntity,
      ServiceOptionEntity,
      ZonePriceEntity,
      PaymentEntity,
    ]),
    HttpModule,
    CommonCouponModule,
    GoogleServicesModule,
    ServiceModule,
    RiderModule,
    RegionModule,
    forwardRef(() => CouponModule),
    RedisHelpersModule,
    SharedOrderModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        SharedCustomerWalletModule,

        RedisHelpersModule,
        NestjsQueryTypeOrmModule.forFeature([
          TaxiOrderEntity,
          DriverEntity,
          CarColorEntity,
          CarModelEntity,
          RegionEntity,
          ServiceCategoryEntity,
          MediaEntity,
          FeedbackParameterEntity,
          RequestActivityEntity,
          FeedbackEntity,
          PaymentEntity,
          OrderCancelReasonEntity,
          ShopOrderCartEntity,
          ShopEntity,
          TaxiOrderShopEntity,
          DriverServicesServiceEntity,
        ]),
        CommonCouponModule,
        SharedOrderModule,
        HttpModule,
      ],
      pubSub: RedisPubSubProvider.provider(),
      services: [
        RiderOrderQueryService,
        RiderOrderService,
        OrderRedisService,
        DriverNotificationService,
      ],
      resolvers: [
        {
          EntityClass: TaxiOrderEntity,
          DTOClass: OrderDTO,
          UpdateDTOClass: UpdateOrderInput,
          ServiceClass: RiderOrderQueryService,
          //Service: RiderOrderQueryService,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
        {
          EntityClass: DriverEntity,
          DTOClass: DriverDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: DriverServicesServiceEntity,
          DTOClass: DriverServicesServiceDTO,
          pagingStrategy: PagingStrategies.NONE,
          create: { disabled: true },
          read: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
        {
          EntityClass: TaxiOrderShopEntity,
          DTOClass: TaxiOrderShopDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: ShopOrderCartEntity,
          DTOClass: ShopOrderCartDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: ShopEntity,
          DTOClass: ShopDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: CarModelEntity,
          DTOClass: CarModelDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: CarColorEntity,
          DTOClass: CarColorDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: FeedbackParameterEntity,
          DTOClass: FeedbackParameterDTO,
          pagingStrategy: PagingStrategies.NONE,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { one: { disabled: true } },
        },
        {
          EntityClass: OrderCancelReasonEntity,
          DTOClass: OrderCancelReasonDTO,
          pagingStrategy: PagingStrategies.NONE,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { one: { disabled: true } },
        },
      ],
    }),
  ],
  providers: [
    OrderSubscriptionService,
    SharedProviderService,
    OrderResolver,
    RiderOrderService,
    SharedDriverService,
    DriverNotificationService,
    RiderNotificationService,
    RedisPubSubProvider.provider(),
  ],
  exports: [RiderOrderService],
})
export class OrderModule {}
