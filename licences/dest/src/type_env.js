"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
var dotenv = require("dotenv");
var dotenvExpand = require("dotenv-expand");
var myEnv = dotenv.config();
dotenvExpand.expand(myEnv);
const envSchma = {
    HTTP_PORT: zod_1.z.string().regex(/^[0-9]{2,5}$/),
    GRPC_PORT: zod_1.z.string().regex(/^[0-9]{2,5}$/),
};
const env = zod_1.z.object(envSchma).parse(process.env);
exports.default = env;
