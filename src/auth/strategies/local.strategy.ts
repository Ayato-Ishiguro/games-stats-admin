import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import type { PasswordOmitUser } from 'src/users/users.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, pass: string): Promise<PasswordOmitUser> {
    const user = await this.authService.validateUser({ email, pass });

    if (!user) {
      throw new UnauthorizedException('email or password incorrect');
    }

    return user;
  }
}
