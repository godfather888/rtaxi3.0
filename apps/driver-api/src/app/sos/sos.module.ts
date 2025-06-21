import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisPubSubProvider } from '@ridy/database';
import { OperatorEntity } from '@ridy/database';
import { SOSEntity } from '@ridy/database';
import { SOSResolver } from './sos.resolver';
import { SOSService } from './sos.service';

@Module({
  imports: [TypeOrmModule.forFeature([SOSEntity, OperatorEntity])],
  providers: [SOSService, SOSResolver, RedisPubSubProvider.provider()],
})
export class SOSModule {}
