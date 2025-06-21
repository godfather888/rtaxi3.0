import { Field, ObjectType, Float } from '@nestjs/graphql';
import { AnnouncementUserType } from '@ridy/database';

@ObjectType('UserTypeCountPair')
export class UserTypeCountPairDTO {
  @Field(() => AnnouncementUserType)
  userType: AnnouncementUserType;
  @Field(() => Float, { nullable: false })
    count: number;
}
