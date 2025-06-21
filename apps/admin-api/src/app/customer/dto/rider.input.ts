import { Field, GraphQLISODateTime, InputType, ObjectType } from '@nestjs/graphql';
import { Gender } from '@ridy/database';
import { RiderStatus } from '@ridy/database';

@InputType()
export class RiderInput {
  @Field(() => RiderStatus, { nullable: true })
  status?: RiderStatus;
  @Field(() => String, { nullable: true })
  firstName?: string;
  @Field(() => String, { nullable: true })
  lastName?: string;
  @Field(() => String, { nullable: true })
  countryIso?: string;
  @Field(() => String, { nullable: true })
  mobileNumber?: string;
  @Field(() => GraphQLISODateTime, { nullable: true })
  registrationTimestamp?: Date;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => Gender, { nullable: true })
  gender?: Gender;
  @Field(() => Boolean, { nullable: true })
  isResident?: boolean;
  @Field(() => String, { nullable: true })
  idNumber?: string;
  @Field(() => String, { nullable: true })
  password?: string;
}
