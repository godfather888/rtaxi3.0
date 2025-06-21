import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RestJwtAuthGuard extends AuthGuard('jwt') {
  override canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  override handleRequest<AuthenticatedUser>(
    err: Error,
    user: AuthenticatedUser,
  ) {
    if (err || !user) {
      throw err || new UnauthorizedException('REST API Auth blocked request.');
    }
    return user;
  }
}
