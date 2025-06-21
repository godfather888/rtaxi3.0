import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { AuthenticatedDriverDTO } from './authenticated-user';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret_driver',
    });
  }

  async validate(
    payload: AuthenticatedDriverDTO,
  ): Promise<AuthenticatedDriverDTO> {
    return { id: payload.id };
  }
}

export async function validateToken(
  token: string,
): Promise<AuthenticatedDriverDTO> {
  const res: AuthenticatedDriverDTO = jwtDecode(token);
  Logger.log(`validated driver socket: ${res.id}`);
  return {
    id: res.id,
  };
}
