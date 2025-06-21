import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { FleetStaffPermissionOrder } from '@ridy/database';
import { MediaDTO } from '../../upload/media.dto';

@ObjectType('FleetStaff')
@Relation('profileImage', () => MediaDTO, { nullable: true })
export class FleetStaffDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
    registeredAt: Date;
  @FilterableField()
  firstName: string;
  @FilterableField()
  lastName: string;
  @Field(() => String, { nullable: false })
    phoneNumber: string;
  @Field(() => String, { nullable: false })
    mobileNumber: string;
  @Field(() => String, { nullable: true })
    email?: string;
  @Field(() => GraphQLISODateTime, { nullable: true })
    lastActivityAt?: Date;
  @FilterableField()
  isBlocked: boolean;
  @Field(() => String, { nullable: true })
    address?: string;
  @FilterableField()
  userName!: string;
  @Field(() => String, { nullable: false })
    password!: string;
  @Field(() => FleetStaffPermissionOrder, { nullable: false })
    permissionOrder!: FleetStaffPermissionOrder;
  @Field(() => FleetStaffPermissionOrder, { nullable: false })
    permissionFinancial!: FleetStaffPermissionOrder;
  @FilterableField(() => ID)
  fleetId!: number;
}
