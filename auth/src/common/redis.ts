import { createClient } from "redis";

const redis = createClient({
	socket: {
		host: process.env.REDIS_HOST,
		port: Number(process.env.REDIS_PORT),
	},
	password: process.env.REDIS_PASSWORD,

});

redis.on("error", (err) => console.log("Redis Client Error", err));

redis.connect();

export default redis;
