import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { type AuthDto } from './dto/auth.dto';
import type { Message, JwtToken, JwtPayload } from './auth.type';
import type { PasswordOmitUser } from 'src/users/users.type';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup({ email, pass }: AuthDto): Promise<Message> {
    const password = await bcrypt.hash(pass, 12);

    try {
      await this.userService.saveUser({ email, password });
      return { message: 'Signup was successful' };
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('This email is already taken');
      }
      throw e;
    }
  }

  async validateUser({
    email,
    pass,
  }: AuthDto): Promise<PasswordOmitUser | null> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) return null;

    const isValidPassword = await bcrypt.compare(pass, user.password);
    if (!isValidPassword) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...passwordOmitUser } = user;
    return passwordOmitUser;
  }

  async login({ id: userId, email }: PasswordOmitUser): Promise<JwtToken> {
    const payload: JwtPayload = { sub: userId, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
