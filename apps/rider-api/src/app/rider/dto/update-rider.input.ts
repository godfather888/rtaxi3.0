import {
  BeforeUpdateOne,
  UpdateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Gender } from '@ridy/database';
import { RiderDocumentType } from '@ridy/database';
import { UserContext } from '../../auth/authenticated-user';

@InputType()
@BeforeUpdateOne(
  (input: UpdateOneInputType<UpdateRiderInput>, context: UserContext) => {
    input.id = context.req.user.id;
    return input;
  },
)
export class UpdateRiderInput {
  @Field(() => String, { nullable: true })
  firstName?: string;
  @Field(() => String, { nullable: true })
  lastName?: string;
  @Field(() => Gender, { nullable: true })
  gender?: Gender;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => String, { nullable: true })
  notificationPlayerId?: string;
  @Field(() => String, { nullable: true })
  password?: string;
  @Field(() => Boolean, { nullable: true })
  isResident?: boolean;
  @Field(() => String, { nullable: true })
  idNumber?: string;
  @Field(() => ID, { nullable: true })
  mediaId?: number;
  @Field(() => Int, { nullable: true })
  presetAvatarNumber?: number;
  @Field(() => RiderDocumentType, { nullable: true })
  documentType?: RiderDocumentType;
}
