import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from '@nestjs/apollo';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  override canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    return super.canActivate(new ExecutionContextHost([req]));
  }

  override handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new AuthenticationError('GqlAuthGuard');
    }
    return user;
  }
}
