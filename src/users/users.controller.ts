import { PasswordOmitUser } from './users.type';
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtGuard)
  profile(@Request() req: { user: PasswordOmitUser }) {
    return req.user;
  }
}
