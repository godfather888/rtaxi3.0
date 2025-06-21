import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverTransactionEntity } from '../entities/taxi/driver-transaction.entity';
import { DriverWalletEntity } from '../entities/taxi/driver-wallet.entity';
import { DriverEntity } from '../entities/taxi/driver.entity';
import { SharedDriverService } from '../order/shared-driver.service';
import { DriverRedisService } from './driver-redis.service';
import { OrderRedisService } from './order-redis.service';
import { AuthRedisService } from '../sms/auth-redis.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DriverEntity,
      DriverWalletEntity,
      DriverTransactionEntity,
    ]),
  ],
  providers: [
    DriverRedisService,
    OrderRedisService,
    SharedDriverService,
    AuthRedisService,
  ],
  exports: [DriverRedisService, OrderRedisService, AuthRedisService],
})
export class RedisHelpersModule {}
