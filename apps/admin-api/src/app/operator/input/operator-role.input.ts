import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AppType } from '@ridy/database';
import { OperatorPermission } from '@ridy/database';
import { ParkingPermission } from '@ridy/database';
import { ShopPermission } from '@ridy/database';
import { TaxiPermission } from '@ridy/database';

@InputType()
export class OperatorRoleInput {
  @Field(() => String)
  title!: string;
  @Field(() => [OperatorPermission], { nullable: true })
  permissions: OperatorPermission[];
  @Field(() => [TaxiPermission], { nullable: true })
  taxiPermissions: TaxiPermission[];
  @Field(() => [ShopPermission], { nullable: true })
  shopPermissions: ShopPermission[];
  @Field(() => [ParkingPermission], { nullable: true })
  parkingPermissions: ParkingPermission[];
  @Field(() => [AppType], { nullable: true })
  allowedApps: AppType[];
}
