import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { RiderAddressType } from '@ridy/database';

@ObjectType('RiderAddress')
export class RiderAddressDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => RiderAddressType, { nullable: false })
  type!: RiderAddressType;
  @Field(() => String, { nullable: false })
  title!: string;
  @Field(() => String, { nullable: true })
  details?: string;
  @Field(() => Point, { nullable: false })
  location!: Point;
  @FilterableField(() => ID)
  riderId!: number;
}
