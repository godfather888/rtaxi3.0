import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { AnnouncementUserType } from '@ridy/database';
import { AppType } from '@ridy/database';

@InputType()
export class AnnouncementInput {
  @Field(() => String)
  title: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => String, { nullable: true })
  url?: string;
  @Field(() => AppType, { nullable: true })
  appType?: AppType;
  @Field(() => [AnnouncementUserType], { nullable: true })
  userType?: AnnouncementUserType[];
  @Field(() => GraphQLISODateTime, { nullable: true })
  startAt?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  expireAt?: Date;
}
