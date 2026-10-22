import { z } from "zod";

const serverEnvSchema = z.object({
  RESEND_API_KEY: z.string().optional(),
  AI_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().optional(),
  AUTH_SESSION_SECRET: z.string().optional(),
});

export const serverEnv = serverEnvSchema.parse(process.env);
