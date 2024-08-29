import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { type Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  findUserByEmail(email: User['email']): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }
}
