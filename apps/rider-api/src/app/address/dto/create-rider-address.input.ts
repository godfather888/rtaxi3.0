import {
  BeforeCreateOne,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { InputType, Field } from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { RiderAddressType } from '@ridy/database';
import { UserContext } from '../../auth/authenticated-user';
import { PhoneNumberDTO } from '../../core/fragments/phone-number.dto';

@InputType()
@BeforeCreateOne(
  (
    input: CreateOneInputType<CreateRiderAddressInput>,
    context: UserContext,
  ) => {
    return { input: { ...input.input, riderId: context.req.user.id } };
  },
)
export class CreateRiderAddressInput {
  @Field(() => String, { nullable: false })
  title!: string;
  @Field(() => String, { nullable: false })
  details!: string;
  @Field(() => Point, { nullable: false })
  location!: Point;
  @Field(() => RiderAddressType, { nullable: false })
  type!: RiderAddressType;
  @Field(() => PhoneNumberDTO, { nullable: false })
  phoneNumber!: PhoneNumberDTO;
}
