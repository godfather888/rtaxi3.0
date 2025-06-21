import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class ConfigRedisService {
  constructor(private readonly redisService: RedisService) {}

  async getConfig(key: ConfigKey) {
    const result = await this.redisService.getOrThrow().get(`config:${key}`);
    if (result == null) return this.getDefault(key);
    return result;
  }

  async setConfig(key: ConfigKey, value: string) {
    await this.redisService.getOrThrow().set(`config:${key}`, value);
  }

  getDefault(key: ConfigKey) {
    if (key == 'twilio:verificationCodeSMSTemplate') {
      return 'Your verification code is {code}';
    }
    return null;
  }
}

type ConfigKey =
  | 'twilio:accountSid'
  | 'twilio:authToken'
  | 'twilio:fromNumber'
  | 'twilio:verificationCodeSMSTemplate';
