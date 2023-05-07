import { z } from "zod";
var dotenv = require("dotenv");
var dotenvExpand = require("dotenv-expand");
var myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const envSchma = {
  HTTP_PORT: z.string().regex(/^[0-9]{2,5}$/),
  GRPC_PORT: z.string().regex(/^[0-9]{2,5}$/),
  LISCENSE_SEVER_URL: z.string(),
  AUTH_SEVER_URL: z.string(),
  LOG_LEVEL: z
    .string()
    .regex(/^(error|warn|info|http|verbose|debug)$/)
    .optional(),
  NODE_ENV: z.string().regex(/^(development|production)$/),
};

const env = z.object(envSchma).parse(process.env);

export default env;
