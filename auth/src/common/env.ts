import { z } from "zod";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const envSchema = z.object({
  GRPC_PORT: z.string(),
  HTTP_PORT: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  // REDIS_PASSWORD: z.string(),
  LOG_LEVEL: z.string().default("debug"),
  GRPC_MULTI_SERVICE: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
