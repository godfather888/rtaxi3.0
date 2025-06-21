import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { AppType } from '@ridy/database';
import { DevicePlatform } from '@ridy/database';
import { DeviceType } from '@ridy/database';

@ObjectType('ShopSession')
export class ShopSessionDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
    createdAt: Date;
  @Field(() => String, { nullable: true })
    deviceName?: string;
  @Field(() => String, { nullable: true })
    ipLocation?: string;
  @Field(() => GraphQLISODateTime, { nullable: true })
    lastActivityAt?: Date;
  @FilterableField(() => ID)
  shopId: number;
  @FilterableField(() => AppType)
  appType: AppType;
  @Field(() => DevicePlatform, { nullable: false })
    devicePlatform: DevicePlatform;
  @Field(() => DeviceType, { nullable: false })
    deviceType: DeviceType;
}
