import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  FleetStaffPermissionFinancial,
  FleetStaffPermissionOrder,
} from '@ridy/database';

@InputType()
export class UpdateFleetStaffInput {
  @Field(() => String, { nullable: true })
  firstName?: string;
  @Field(() => String, { nullable: true })
  lastName?: string;
  @Field(() => String, { nullable: true })
  phoneNumber?: string;
  @Field(() => String, { nullable: true })
  mobileNumber?: string;
  @Field(() => String, { nullable: true })
  address?: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => String, { nullable: true })
  userName?: string;
  @Field(() => String, { nullable: true })
  password?: string;
  @Field(() => FleetStaffPermissionOrder, { nullable: true })
  permissionOrder?: FleetStaffPermissionOrder;
  @Field(() => FleetStaffPermissionFinancial, { nullable: true })
  permissionFinancial?: FleetStaffPermissionFinancial;
  @Field(() => ID, { nullable: true })
  profileImageId?: number;
  @Field(() => Boolean, { nullable: true })
  isBlocked?: boolean;
}
