import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CryptoService,
  DatabaseModule,
  entities,
  RedisPubSubProvider,
} from '@ridy/database';
import { GeoModule } from '@ridy/database';
import { SharedOrderModule } from '@ridy/database';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { join } from 'path';
import { AddressModule } from './address/address.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { AuthModule } from './auth/auth.module';
import { validateToken } from './auth/jwt.strategy';
import { ChatModule } from './chat/chat.module';
import { ComplaintModule } from './complaint/complaint.module';
import { CouponModule } from './coupon/coupon.module';
import { DriverTendencyModule } from './driver_tendency/driver_tendency.module';
import { OrderModule } from './order/order.module';
import { RiderApiSetupNotFoundController } from './rider-api-setup-not-found.controller';
import { RiderAPIController } from './rider-api.controller';
import { RiderModule } from './rider/rider.module';
import { ServiceModule } from './service/service.module';
import { SOSModule } from './sos/sos.module';
import { UploadModule } from './upload/upload.module';
import { WalletModule } from './wallet/wallet.module';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { SharedCustomerWalletModule } from '@ridy/database';
import { Context } from 'graphql-ws';
import {
  getConfig,
  LicenseVerifyModule,
  LicenseVerifyService,
} from 'license-verify';
import { RedisHelpersModule } from '@ridy/database';

@Module({})
export class RiderAPIModule implements OnModuleInit {
  constructor(private licenseService: LicenseVerifyService) {}

  async onModuleInit() {
    const license = await this.licenseService.verifyLicense();
    Logger.log(license, 'RiderAPIModule.onModuleInit.license');
  }

  static async register(): Promise<DynamicModule> {
    if (await getConfig(process.env.NODE_ENV ?? 'production')) {
      return {
        module: RiderAPIModule,
        imports: [
          DatabaseModule,
          LicenseVerifyModule,
          SharedCustomerWalletModule,
          SentryModule.forRoot(),
          GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            installSubscriptionHandlers: true,
            autoSchemaFile: true,
            subscriptions: {
              'graphql-ws': {
                connectionInitWaitTimeout: 5000,
                onDisconnect: (ctx: Context) => {
                  Logger.log(
                    'Socket disconnected without user',
                    'RiderAPIModule',
                  );
                },
                onConnect: async (
                  ctx: Context<Record<string, unknown> | undefined, unknown>,
                ) => {
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
              },
            },
          }),
          TypeOrmModule.forFeature(entities),
          AuthModule.register(),
          UploadModule,
          RiderModule,
          ServiceModule,
          OrderModule,
          DriverTendencyModule,
          AddressModule,
          AnnouncementModule,
          GeoModule,
          SharedOrderModule,
          RedisHelpersModule,
          ComplaintModule,
          SOSModule,
          WalletModule,
          CouponModule,
          ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
          }),
          RedisModule.forRoot({
            closeClient: true,
            commonOptions: { db: 2 },
            config: {
              host: process.env.REDIS_HOST ?? 'localhost',
            },
          }),
          ChatModule,
        ],
        providers: [
          CryptoService,
          RedisPubSubProvider.provider(),
          {
            provide: APP_FILTER,
            useClass: SentryGlobalFilter,
          },
        ],
        controllers: [RiderAPIController],
      };
    }
    return {
      module: RiderAPIModule,
      imports: [LicenseVerifyModule],
      controllers: [RiderApiSetupNotFoundController],
    };
  }
}
