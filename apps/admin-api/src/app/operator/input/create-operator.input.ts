import { Authorize } from '@ptc-org/nestjs-query-graphql';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { OperatorAuthorizer } from '../dto/operator.authorizer';

@InputType()
@Authorize(OperatorAuthorizer)
export class CreateOperatorInput {
  @Field(() => String, { nullable: true })
    firstName?: string;
  @Field(() => String, { nullable: true })
    lastName?: string;
  @Field(() => String, { nullable: false })
    userName!: string;
  @Field(() => String, { nullable: false })
    password!: string;
  @Field(() => String, { nullable: false })
    mobileNumber!: string;
  @Field(() => String, { nullable: true })
    email?: string;
  @Field(() => ID)
  roleId!: number;
}
