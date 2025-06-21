import { Authorize } from '@ptc-org/nestjs-query-graphql';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { OperatorAuthorizer } from '../dto/operator.authorizer';

@InputType()
@Authorize(OperatorAuthorizer)
export class UpdateOperatorInput {
  @Field(() => String, { nullable: true })
  firstName?: string;
  @Field(() => String, { nullable: true })
  lastName?: string;
  @Field(() => String, { nullable: true })
  userName?: string;
  @Field(() => String, { nullable: true })
  password?: string;
  @Field(() => String, { nullable: true })
  mobileNumber?: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => ID, { nullable: true })
  roleId?: number;
  @Field(() => Boolean, { nullable: true })
  isBlocked?: boolean;
  @Field(() => [String], { nullable: true })
  enabledNotifications?: string[];
  @Field(() => String, { nullable: true })
  address?: string;
  @Field(() => ID, { nullable: true })
  mediaId?: number;
}
