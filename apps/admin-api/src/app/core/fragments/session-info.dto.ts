import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { AppType } from '@ridy/database';
import { DevicePlatform } from '@ridy/database';
import { DeviceType } from '@ridy/database';

@ObjectType('SessionInfo')
export class SessionInfoDTO {
  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  lastActivityAt?: Date;

  @Field(() => String, { nullable: true })
  ip?: string;

  @Field(() => String, { nullable: true })
  ipLocation?: string;

  @Field(() => String, { nullable: true })
  deviceName?: string;

  @Field(() => AppType)
  appType!: AppType;

  @Field(() => DevicePlatform)
  devicePlatform!: DevicePlatform;

  @Field(() => DeviceType)
  deviceType!: DeviceType;
  @Field(() => String)
  token!: string;
}
