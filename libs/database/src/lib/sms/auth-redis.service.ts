import { ForbiddenError } from '@nestjs/apollo';
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class AuthRedisService {
  constructor(private readonly redisService: RedisService) {}

  async createVerificationCode(input: VerifyHash): Promise<{ hash: string }> {
    const hash = Math.random().toString(36).substring(7);
    const verifyHash: VerifyHash = {
      mobileNumber: input.mobileNumber,
      countryIso: input.countryIso,
      code: input.code,
    };
    await this.redisService.getOrThrow().hset(`verify:${hash}`, verifyHash);
    await this.redisService.getOrThrow().expire(`verify:${hash}`, 60 * 3);
    return { hash };
  }

  async isVerificationCodeValid(
    hash: string,
    code: string,
  ): Promise<VerifyHash | null> {
    const verifyHash: VerifyHash = (await this.redisService
      .getOrThrow()
      .hgetall(`verify:${hash}`)) as any;
    Logger.log(verifyHash, 'verifyHash');
    if (!verifyHash) throw new ForbiddenError('EXPIRED');
    if (process.env.DEMO_MODE != null || verifyHash.code == code) {
      return verifyHash;
    } else {
      throw new ForbiddenError('INVALID');
    }
  }

  async deleteVerificationCode(hash: string) {
    await this.redisService.getOrThrow().del(`verify:${hash}`);
  }
}

export class VerifyHash {
  mobileNumber!: string;
  countryIso?: string;
  code!: string;
}
