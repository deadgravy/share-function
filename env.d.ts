import { z } from 'zod';

export {};

const envSchema = z.object({
  FRONTEND_URL: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
