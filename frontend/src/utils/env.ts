import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  VITE_AUTH_API: z.string().default("http://localhost:5000"),
  VITE_BACK_API: z.string().default("http://localhost:3001"),
  VITE_MULTITENANCY_API: z.string().default("http://localhost:4000"),
  VITE_LICENSE_API: z.string().default("http://localhost:2000"),
});

export const env = envSchema.parse(import.meta.env);
