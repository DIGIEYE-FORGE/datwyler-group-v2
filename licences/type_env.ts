import { z } from 'zod';
var dotenv = require("dotenv");
var dotenvExpand = require("dotenv-expand");
var myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const envSchma = {
	HTTP_PORT: z.string().regex(/^[0-9]{2,5}$/),
	GRPC_PORT: z.string().regex(/^[0-9]{2,5}$/),
};

const env = z.object(envSchma).parse(process.env);

export default env;