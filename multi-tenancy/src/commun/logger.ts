import winston from "winston";
import env from "./env";
import path from "path";

const errorPath = path.resolve(__dirname, "../../logs/error.log");
const combinedPath = path.resolve(__dirname, "../../logs/combined.log");

const logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
  },
  level: env.LOG_LEVEL || "orror",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: errorPath, level: "error" }),
    new winston.transports.File({ filename: combinedPath }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
