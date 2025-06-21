import {
  Authorize,
  FilterableField,
  IDField,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { OperatorPermission } from '@ridy/database';
import { OperatorAuthorizer } from './operator.authorizer';
import { AppType } from '@ridy/database';
import { ShopPermission } from '@ridy/database';
import { ParkingPermission } from '@ridy/database';
import { TaxiPermission } from '@ridy/database';

@ObjectType('OperatorRole')
@Authorize(OperatorAuthorizer)
export class OperatorRoleDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField()
  title!: string;
  @Field(() => [OperatorPermission], { nullable: false })
    permissions: OperatorPermission[];
  @Field(() => [TaxiPermission], { nullable: false })
    taxiPermissions: TaxiPermission[];
  @Field(() => [ShopPermission], { nullable: false })
    shopPermissions: ShopPermission[];
  @Field(() => [ParkingPermission], { nullable: false })
    parkingPermissions: ParkingPermission[];
  @Field(() => [AppType], { nullable: false })
    allowedApps: AppType[];
}
