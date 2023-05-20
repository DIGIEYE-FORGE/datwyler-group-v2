import { NextFunction, Response, Request } from "express";
import logger from "../commun/logger";
import authClient from "../auth-client";

function logRequest(req: Request, _res: Response, next: NextFunction) {
  logger.debug(`${req.method} ${req.path}`);
  next();
}

async function VerifyToken(
  req: Request & { userId?: number },
  res: Response,
  next: NextFunction
) {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      const result = await authClient.verify({
        accessToken: bearerToken,
      });
      logger.debug("VerifyToken", result);
      req.userId = result?.id;
      next();
    } else {
      logger.error("VerifyToken", "No token");
      res.sendStatus(401);
    }
  } catch (e) {
    logger.error(e);
    res.sendStatus(401);
  }
}

export { logRequest, VerifyToken };
