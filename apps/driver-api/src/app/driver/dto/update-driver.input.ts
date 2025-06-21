import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { DriverStatus } from '@ridy/database';
import { Gender } from '@ridy/database';

@InputType()
export class UpdateDriverInput {
  @Field(() => String, { nullable: true })
  firstName?: string;
  @Field(() => String, { nullable: true })
  lastName?: string;
  @Field(() => DriverStatus, { nullable: true })
  status?: DriverStatus;
  @Field(() => String, { nullable: true })
  certificateNumber?: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => Int, { nullable: true })
  carProductionYear?: number;
  @Field(() => String, { nullable: true })
  carPlate?: string;
  @Field(() => ID, { nullable: true })
  mediaId?: number;
  @Field(() => Gender, { nullable: true })
  gender?: Gender;
  @Field(() => String, { nullable: true })
  accountNumber?: string;
  @Field(() => String, { nullable: true })
  bankName?: string;
  @Field(() => String, { nullable: true })
  bankRoutingNumber?: string;
  @Field(() => String, { nullable: true })
  password?: string;
  @Field(() => String, { nullable: true })
  bankSwift?: string;
  @Field(() => Int, { nullable: true })
  presetAvatarNumber?: number;
  @Field(() => String, { nullable: true })
  address?: string;
  @Field(() => ID, { nullable: true })
  carModelId?: number;
  @Field(() => ID, { nullable: true })
  carId?: number;
  @Field(() => ID, { nullable: true })
  carColorId?: number;
  @Field(() => String, { nullable: true })
  notificationPlayerId?: string;
  @Field(() => Int, { nullable: true })
  searchDistance?: number;
}
