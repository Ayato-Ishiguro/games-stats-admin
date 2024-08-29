import { z } from 'zod';

const NODE_ENV = ['development', 'test', 'production'];
const zodString = z.string().min(1);

const envSchme = z.object({
  NODE_ENV: z.string().refine((v) => NODE_ENV.includes(v)),
  DATABASE_HOST: zodString,
  DATABASE_NAME: zodString,
  DATABASE_USER: zodString,
  DATABASE_PASSWORD: zodString,
  DATABASE_PORT: z
    .string()
    .regex(/^\d+$/, { message: '数値の文字列を入力してください' }),
});

export function validate(
  config: Record<string, unknown>,
): Record<string, unknown> {
  envSchme.parse(config);
  return config;
}
