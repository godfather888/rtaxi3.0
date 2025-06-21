import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Logger, Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule, entities, GeoModule } from '@ridy/database';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Context as WSContext } from 'graphql-ws';
import { join } from 'path';
import { AccountingModule } from './accounting/accounting.module';
import { AddressModule } from './address/address.module';
import { AdminApiSetupNotFoundController } from './admin-api-setup-not-found.controller';
import { AppController } from './admin-api.controller';
import { AnnouncementModule } from './announcement/announcement.module';
import { AuthModule } from './auth/auth.module';
import { validateToken } from './auth/jwt.strategy';
import { CarModule } from './car/car.module';
import { ConfigurationModule } from './config/configuration.module';
import { CouponModule } from './coupon/coupon.module';
import { DriverModule } from './driver/driver.module';
import { FeedbackModule } from './feedback/feedback.module';
import { FleetModule } from './fleet/fleet.module';
import { OperatorModule } from './operator/operator.module';
import { OrderModule } from './order/order.module';
import { PaymentGatewayModule } from './payment-gateway/payment-gateway.module';
import { PayoutModule } from './payout/payout.module';
import { RegionModule } from './region/region.module';
import { CustomerModule } from './customer/customer.module';
import { ServiceModule } from './service/service.module';
import { UploadModule } from './upload/upload.module';
import { SOSModule } from './sos/sos.module';
import { RewardModule } from './reward/reward.module';
import { GiftCardModule } from './gift-card/gift-card.module';
import { SMSProviderModule } from './sms-provider/sms-provider.module';
import { ShopModule } from './shop/shop.module';
import { ParkingModule } from './parking/parking.module';
import { InsightsModule } from './insights/insights.module';
import { ZonePriceModule } from './zone_price/zone-price.module';
import { DriverDocumentModule } from './driver-document/driver-document.module';
import { DriverShiftRuleModule } from './driver-shift-rule/driver-shift-rule.module';
import {
  getConfig,
  LicenseVerifyModule,
  LicenseVerifyService,
} from 'license-verify';
import { ComplaintModule } from './taxi-support-request/taxi-support-request.module';
import { NotificationModule } from './notification/notification.module';
import { PlatformOverviewModule } from './platform-overview/platform-overview.module';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({})
export class AdminAPIModule implements OnModuleInit {
  constructor(private readonly licenseVerifyService: LicenseVerifyService) {}

  async onModuleInit() {
    const license = await this.licenseVerifyService.verifyLicense();
    Logger.log(license, 'AdminAPIModule.onModuleInit.license');
    Logger.log(
      process.env.NODE_ENV ?? 'prod',
      'AdminAPIModule.onModuleInit.env',
    );
  }

  static async register(): Promise<DynamicModule> {
    if (await getConfig(process.env.NODE_ENV ?? 'production')) {
      return {
        module: AdminAPIModule,
        imports: [
          DatabaseModule,
          LicenseVerifyModule,
          PlatformOverviewModule,
          GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            context: ({ req, res, extra }) => {
              return extra && extra.user
                ? {
                    req: req,
                    res: res,
                    user: extra.user,
                  }
                : { req: req, res: res };
            },
            subscriptions: {
              'graphql-ws': {
                onConnect: async (ctx: WSContext) => {
                  const token =
                    (ctx.connectionParams?.['authToken'] as string) ||
                    undefined;

                  Logger.log(token, 'RiderAPIModule.onConnect.token');
                  if (!token) {
                    throw new Error('Missing auth token!');
                  }
                  const user = await validateToken(token!)!;
                  Logger.log(user, 'RiderAPIModule.onConnect.user');
                  ctx.extra = {
                    user,
                  };
                  return { user };
                },
                onDisconnect: () => {
                  Logger.log('connection disconnected', 'GraphQL');
                },
                onSubscribe: () => {
                  Logger.log(`subscription started`, 'GraphQL');
                },
              },
            },
            autoSchemaFile: join(
              process.cwd(),
              'apps/admin-frontend/lib/schema.graphql',
            ),
          }),
          TypeOrmModule.forFeature(entities),
          ServiceModule,
          OperatorModule,
          CustomerModule,
          InsightsModule,
          DriverModule,
          DriverDocumentModule,
          DriverShiftRuleModule,
          FleetModule,
          OrderModule,
          AnnouncementModule,
          CouponModule,
          GiftCardModule,
          AccountingModule,
          RegionModule,
          PaymentGatewayModule,
          CarModule,
          FeedbackModule,
          AddressModule,
          AuthModule,
          PayoutModule,
          UploadModule,
          SOSModule,
          SentryModule.forRoot(),
          ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
          }),
          RewardModule,
          ComplaintModule,
          GeoModule,
          ShopModule,
          ParkingModule,
          ConfigurationModule,
          HttpModule,
          SMSProviderModule,
          ZonePriceModule,
          NotificationModule,
          RedisModule.forRoot({
            closeClient: true,
            commonOptions: { db: 2 },
            config: {
              host: process.env.REDIS_HOST ?? 'localhost',
            },
          }),
        ],
        providers: [
          {
            provide: APP_FILTER,
            useClass: SentryGlobalFilter,
          },
        ],
        controllers: [AppController],
      };
    }
    return {
      module: AdminAPIModule,
      imports: [
        HttpModule,
        SentryModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
        }),
        ConfigurationModule,
        LicenseVerifyModule,
      ],
      controllers: [AdminApiSetupNotFoundController],
      providers: [
        {
          provide: APP_FILTER,
          useClass: SentryGlobalFilter,
        },
      ],
    };
  }
}
