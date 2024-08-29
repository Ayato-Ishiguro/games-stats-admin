import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type DbConfig = {
  host?: string;
  name?: string;
  user?: string;
  password?: string;
  port?: string;
};

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  isDev(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'development';
  }

  get dbConfig(): DbConfig {
    return {
      host: this.configService.get<string>('DATABASE_HOST'),
      name: this.configService.get<string>('DATABASE_NAME'),
      user: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      port: this.configService.get<string>('DATABASE_PORT'),
    };
  }
}
