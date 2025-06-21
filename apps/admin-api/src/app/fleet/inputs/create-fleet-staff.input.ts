import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  FleetStaffPermissionFinancial,
  FleetStaffPermissionOrder,
} from '@ridy/database';

@InputType('CreateFleetStaffInput')
export class CreateFleetStaffInput {
  @Field(() => ID)
  fleetId: string;
  @Field(() => String, { nullable: false })
    firstName: string;
  @Field(() => String, { nullable: false })
    lastName: string;
  @Field(() => String, { nullable: true })
    email?: string;
  @Field(() => String, { nullable: true })
    phoneNumber?: string;
  @Field(() => String, { nullable: true })
    mobileNumber?: string;
  @Field(() => String, { nullable: true })
    address?: string;
  @Field(() => String, { nullable: false })
    userName!: string;
  @Field(() => String, { nullable: false })
    password!: string;
  @Field(() => FleetStaffPermissionOrder)
  permissionOrder!: FleetStaffPermissionOrder;
  @Field(() => FleetStaffPermissionFinancial)
  permissionFinancial!: FleetStaffPermissionFinancial;
  @Field(() => ID, { nullable: true })
  profileImageId?: number;
}
