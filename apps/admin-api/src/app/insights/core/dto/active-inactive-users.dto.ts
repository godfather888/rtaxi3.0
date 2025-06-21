import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType('ActiveInactiveUsers')
export class ActiveInactiveUsersDTO {
  @Field(() => Date, {
    description: 'Any date in the range of the data.',
  })
  date: Date;
  @Field(() => Int)
  count: number;

  @Field(() => UserActivityLevel)
  activityLevel: UserActivityLevel;
}

export enum UserActivityLevel {
  Active = 'active',
  Inactive = 'inactive',
}

registerEnumType(UserActivityLevel, {
  name: 'UserActivityLevel',
  description: 'The activity level of the user.',
});
