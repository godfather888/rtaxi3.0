import {
  Authorize,
  FilterableField,
  IDField,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { RiderAddressType } from '@ridy/database';
import { UserContext } from '../../auth/authenticated-user';
import { PhoneNumberDTO } from '../../core/fragments/phone-number.dto';

@ObjectType('RiderAddress')
@Authorize({
  authorize: (context: UserContext) => ({
    riderId: { eq: context.req.user.id },
  }),
})
export class RiderAddressDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => RiderAddressType, { nullable: false })
  type!: RiderAddressType;
  @Field(() => String, { nullable: false })
  title!: string;
  @Field(() => String, { nullable: false })
  details!: string;
  @Field(() => Point, { nullable: false })
  location!: Point;
  @FilterableField(() => ID, { filterOnly: true })
  riderId!: number;
  @Field(() => PhoneNumberDTO, { nullable: true })
  phoneNumber?: PhoneNumberDTO;
}
