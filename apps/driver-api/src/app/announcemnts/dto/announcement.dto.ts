import {
  Authorize,
  FilterableField,
  IDField,
  PagingStrategies,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { AnnouncementUserType } from '@ridy/database';

@ObjectType('Announcement')
@QueryOptions({
  pagingStrategy: PagingStrategies.NONE,
})
@Authorize({
  authorize: () => ({
    startAt: { lt: new Date() },
    expireAt: { gt: new Date() },
  }),
})
export class AnnouncementDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, { nullable: false })
  title!: string;
  @Field(() => String, { nullable: false })
  description!: string;
  @Field(() => GraphQLISODateTime, { nullable: false })
  startAt!: Date;
  @Field(() => GraphQLISODateTime, { nullable: false })
  expireAt!: Date;
  @Field(() => String, { nullable: true })
  url?: string;
  @FilterableField(() => AnnouncementUserType)
  @Field(() => [AnnouncementUserType], { nullable: false })
  userType!: AnnouncementUserType[];
}
