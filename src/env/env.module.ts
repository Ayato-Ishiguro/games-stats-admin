import { Global, Module } from '@nestjs/common';
import { EnvService } from './env.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'class-validator';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validate,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
