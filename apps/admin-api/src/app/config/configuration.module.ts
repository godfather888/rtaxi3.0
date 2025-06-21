import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationResolver } from './configuration.resolver';
import { ConfigurationService } from './configuration.service';
import { LicenseVerifyModule } from 'license-verify';

@Module({
  imports: [HttpModule, LicenseVerifyModule],
  providers: [ConfigurationService, ConfigurationResolver],
  controllers: [ConfigurationController],
})
export class ConfigurationModule {}
