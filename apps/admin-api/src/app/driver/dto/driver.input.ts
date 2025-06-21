import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { DriverStatus } from '@ridy/database';
import { Gender } from '@ridy/database';
import { DeliveryPackageSize } from '@ridy/database';

@InputType()
export class UpdateDriverInput {
  @Field(() => ID, { nullable: true })
  fleetId?: number;
  @Field(() => ID, { nullable: true })
  carId?: number;
  @Field(() => String, { nullable: true })
  mobileNumber?: string;
  @Field(() => ID, { nullable: true })
  carColorId?: number;
  @Field(() => String, { nullable: true })
  firstName?: string;
  @Field(() => String, { nullable: true })
  lastName?: string;
  @Field(() => String, { nullable: true })
  certificateNumber?: string;
  @Field(() => Boolean, { nullable: true })
  canDeliver?: boolean;
  @Field(() => DeliveryPackageSize, { nullable: true })
  maxDeliveryPackageSize?: DeliveryPackageSize;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => String, { nullable: true })
  password?: string;
  @Field(() => Int, { nullable: true })
  carProductionYear?: number;
  @Field(() => String, { nullable: true })
  carPlate?: string;
  @Field(() => DriverStatus, { nullable: true })
  status?: DriverStatus;
  @Field(() => Gender, { nullable: true })
  gender?: Gender;
  @Field(() => String, { nullable: true })
  accountNumber?: string;
  @Field(() => String, { nullable: true })
  bankName?: string;
  @Field(() => String, { nullable: true })
  bankRoutingNumber?: string;
  @Field(() => String, { nullable: true })
  bankSwift?: string;
  @Field(() => String, { nullable: true })
  address?: string;
  @Field(() => String, { nullable: true })
  softRejectionNote?: string;
  @Field(() => ID, { nullable: true })
  mediaId?: number;
}
