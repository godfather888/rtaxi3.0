import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DevicePlatform } from '@ridy/database';

@ObjectType('PlatformDistribution')
export class PlatformDistributionDTO {
  @Field(() => DevicePlatform)
  platform: DevicePlatform;
  @Field(() => Int)
  count: number;
}
