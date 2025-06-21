import { DynamicModule, Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SMSModule } from '@ridy/database';

import { RiderModule } from '../rider/rider.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RedisHelpersModule } from '@ridy/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerSessionEntity } from '@ridy/database';
import { SharedShopModule } from '@ridy/database';
import { SharedCustomerWalletModule } from '@ridy/database';
import { getConfig } from 'license-verify';

@Module({})
export class AuthModule {
  static async register(): Promise<DynamicModule> {
    const modules = [
      SharedCustomerWalletModule,
      RiderModule,
      PassportModule,
      SMSModule,
      SharedShopModule,
      RedisHelpersModule,
      TypeOrmModule.forFeature([CustomerSessionEntity]),
      JwtModule.register({
        secret: 'secret_rider',
      }),
    ];
    let providers = [];
    const config = await getConfig(process.env.NODE_ENV ?? 'production');
    Logger.log(config, 'AuthModule.register.config');
    if (config) {
      providers = [AuthService, JwtStrategy, AuthResolver];
    }
    return {
      module: AuthModule,
      imports: modules,
      providers: providers,
    };
  }
}
