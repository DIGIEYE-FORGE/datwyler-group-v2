import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  VITE_AUTH_API: z.string().url(),
});

export const env = envSchema.parse(import.meta.env);
