import { GqlExecutionContext, ObjectType } from '@nestjs/graphql';

@ObjectType('AuthenticatedOperator')
export class AuthenticatedOperatorDTO {
  id: number;
}

export type UserContext = GqlExecutionContext & {
  req: { user: AuthenticatedOperatorDTO };
};

export type WSContext = { req: { user: AuthenticatedOperatorDTO } };
