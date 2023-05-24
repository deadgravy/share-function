import { z } from 'zod';

export {};

const envSchema = z.object({
  FRONTEND_URL: z.string(),
  NODE_ENV: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
