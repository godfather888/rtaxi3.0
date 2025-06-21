import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { EnabledNotification } from '@ridy/database';

@InputType()
export class UpdateProfileInput {
  @Field(() => String, { nullable: true })
    firstName?: string;
  @Field(() => String, { nullable: true })
    lastName?: string;
  @Field(() => String, { nullable: true })
    email?: string;
  @Field(() => String, { nullable: true })
    mobileNumber?: string;
  @Field(() => String, { nullable: true })
    userName?: string;
  @Field(() => ID, { nullable: true })
  mediaId?: number;
  @Field(() => [EnabledNotification], { nullable: true })
  enabledNotifications?: EnabledNotification[];
}
