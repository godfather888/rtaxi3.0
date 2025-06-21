import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisPubSubProvider } from '@ridy/database';
import { DriverTransactionEntity } from '@ridy/database';
import { DriverWalletEntity } from '@ridy/database';
import { DriverEntity } from '@ridy/database';
import { TaxiOrderEntity } from '@ridy/database';
import { ProviderTransactionEntity } from '@ridy/database';
import { ProviderWalletEntity } from '@ridy/database';
import { CustomerEntity } from '@ridy/database';
import { RiderTransactionEntity } from '@ridy/database';
import { RiderWalletEntity } from '@ridy/database';
import { ServiceCategoryEntity } from '@ridy/database';
import { ServiceEntity } from '@ridy/database';
import { PaymentEntity } from '@ridy/database';
import { FirebaseNotificationModule } from '@ridy/database';
import { GoogleServicesModule } from '@ridy/database';
import { SharedOrderService } from '@ridy/database';
import { SharedProviderService } from '@ridy/database';
import { SharedFleetService } from '@ridy/database';
import { RegionModule } from '@ridy/database';
import { SharedRiderService } from '@ridy/database';
import { ServiceService } from '@ridy/database';

import { OrderDTO } from './dto/order.dto';
import { OrderResolver } from './order.resolver';
import { DriverOrderQueryService } from './driver-order.query-service';
import { RedisHelpersModule } from '@ridy/database';
import { CronJobService } from './cron-job.service';
import { DriverModule } from '../driver/driver.module';
import { SharedDriverService } from '@ridy/database';
import { OrderService } from './order.service';
import { FleetWalletEntity } from '@ridy/database';
import { FleetTransactionEntity } from '@ridy/database';
import { OrderSubscriptionService } from './order-subscription.service';
import { RiderDTO } from './dto/rider.dto';
import { RequestActivityEntity } from '@ridy/database';
import { FleetEntity } from '@ridy/database';
import { ServiceOptionEntity } from '@ridy/database';
import { CommonCouponModule } from '@ridy/database';
import { ZonePriceEntity } from '@ridy/database';
import { HttpModule } from '@nestjs/axios';
import { OrderCancelReasonEntity } from '@ridy/database';
import { OrderCancelReasonDTO } from './dto/cancel-reason.dto';
import { RiderReviewEntity } from '@ridy/database';
import { SharedCustomerWalletModule } from '@ridy/database';

@Module({
  imports: [
    RedisHelpersModule,
    DriverModule,
    CommonCouponModule,
    SharedCustomerWalletModule,
    TypeOrmModule.forFeature([
      TaxiOrderEntity,
      ServiceCategoryEntity,
      ServiceOptionEntity,
      ServiceEntity,
      CustomerEntity,
      RiderWalletEntity,
      RiderTransactionEntity,
      DriverEntity,
      DriverWalletEntity,
      DriverTransactionEntity,
      ProviderWalletEntity,
      ProviderTransactionEntity,
      FleetEntity,
      FleetWalletEntity,
      FleetTransactionEntity,
      ZonePriceEntity,
      PaymentEntity,
      RiderReviewEntity,
    ]),
    RegionModule,
    HttpModule,
    FirebaseNotificationModule.register(),
    GoogleServicesModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          TaxiOrderEntity,
          CustomerEntity,
          RequestActivityEntity,
          OrderCancelReasonEntity,
        ]),
      ],
      pubSub: RedisPubSubProvider.provider(),
      dtos: [{ DTOClass: OrderDTO }],
      resolvers: [
        {
          DTOClass: RiderDTO,
          EntityClass: CustomerEntity,
          read: { disabled: true },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
        },
        {
          DTOClass: OrderCancelReasonDTO,
          EntityClass: OrderCancelReasonEntity,
          read: { one: { disabled: false } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
        },
      ],
    }),
  ],
  providers: [
    OrderSubscriptionService,
    SharedOrderService,
    DriverOrderQueryService,
    OrderResolver,
    OrderService,
    ServiceService,
    SharedRiderService,
    SharedDriverService,
    SharedProviderService,
    SharedFleetService,
    RedisPubSubProvider.provider(),
    CronJobService,
  ],
  exports: [DriverOrderQueryService, SharedDriverService],
})
export class OrderModule {}
