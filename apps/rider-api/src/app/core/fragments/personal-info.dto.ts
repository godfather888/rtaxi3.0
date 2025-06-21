import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { Gender } from '@ridy/database';

@ObjectType('PersonalInfo')
@InputType('PersonalInfoInput')
export class PersonalInfoDTO {
  @Field(() => String, { nullable: true })
  firstName?: string;
  @Field(() => String, { nullable: true })
  lastName?: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => String, { nullable: true })
  mobileNumber?: string;
  @Field(() => Gender, { nullable: true })
  gender?: Gender;
  @Field(() => String, { nullable: true })
  address?: string;
}
