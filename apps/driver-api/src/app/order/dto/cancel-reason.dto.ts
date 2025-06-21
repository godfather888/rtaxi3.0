import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Authorize,
  FilterableField,
  IDField,
} from '@ptc-org/nestjs-query-graphql';
import { AnnouncementUserType } from '@ridy/database';

@Authorize({
  authorize: (context) => ({
    userType: { eq: AnnouncementUserType.Driver },
    isEnabled: true,
  }),
})
@ObjectType('OrderCancelReason')
export class OrderCancelReasonDTO {
  @IDField(() => ID)
  id!: number;
  @Field()
  title!: string;
  @FilterableField({ filterOnly: true })
  @Field(() => Boolean, { nullable: false })
  isEnabled!: boolean;
  @FilterableField(() => AnnouncementUserType, { filterOnly: true })
  @Field(() => AnnouncementUserType, { nullable: false })
  userType!: AnnouncementUserType;
}
