import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { RiderAddressType } from '@ridy/database';

@ObjectType('Address')
export class AddressDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, { nullable: false })
    title!: string;
  @Field(() => RiderAddressType, { nullable: false })
    type!: RiderAddressType;
  @Field(() => String, { nullable: true })
    details?: string;
  @Field(() => Point, { nullable: false })
    location!: Point;
  @FilterableField(() => ID)
  riderId!: number;
}
