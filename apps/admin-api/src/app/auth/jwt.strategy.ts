import { ExtractJwt, Strategy as JwtBaseStrategy } from 'passport-jwt'; // <-- Alias Strategy to avoid naming conflict
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode'; // Keep if you still need it for validateToken function

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtBaseStrategy, 'jwt') {
  // Use JwtBaseStrategy here
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // **IMPORTANT: In a real application, NEVER hardcode your secret. Use environment variables.**
    });
  }

  async validate(payload: AuthenticatedUser): Promise<AuthenticatedUser> {
    // The 'payload' here is the decoded JWT payload.
    // Ensure that your JWT actually contains an 'id' property if you're returning { id: payload.id }.
    return payload;
  }
}

export type AuthenticatedUser = { id: number };

// This function is separate and might not be directly related to the JwtStrategy error,
// but it's good to keep it if you need to decode tokens outside of the strategy.
// Note: jwt-decode does not verify the token's signature or expiration.
export async function validateToken(token: string): Promise<{ id: number }> {
  try {
    const res: any = jwtDecode(token);
    return {
      id: res.id,
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    throw new Error('Invalid token');
  }
}
