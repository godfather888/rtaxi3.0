import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AnnouncementUserType } from '@ridy/database';

@InputType()
export class OrderCancelReasonInput {
  @Field(() => String, { nullable: true })
  title?: string;
  @Field(() => Boolean, { nullable: true })
  isEnabled?: boolean;
  @Field(() => AnnouncementUserType, { nullable: true })
  userType?: AnnouncementUserType;
}
