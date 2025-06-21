import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret_rider',
    });
  }

  async validate(payload: AuthenticatedUser): Promise<AuthenticatedUser> {
    return { id: payload.id };
  }
}

export type AuthenticatedUser = { id: number };

export async function validateToken(token: string): Promise<AuthenticatedUser> {
  const res: AuthenticatedUser = jwtDecode(token);
  Logger.log(`validated rider socket: ${res.id}`);
  return {
    id: res.id,
  };
}
