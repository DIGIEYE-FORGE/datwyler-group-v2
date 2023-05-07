import { NextFunction, Response, Request } from "express";
import logger from "../commun/logger";
import authClient from "../auth-client";
import { log } from "console";


function logRequest(req: Request, _res: Response, next: NextFunction) {
  logger.debug(`${req.method} ${req.path}`);
  next();
}

async function VerifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      const result = await authClient.verify({
        accessToken: bearerToken,
      });
      logger.debug("VerifyToken", result);
      next();
    }
    else {
      logger.error("VerifyToken", "No token");
      res.sendStatus(401);
    }

  }
  catch (e) {
    logger.error(e);
    res.sendStatus(401);
  }
  // try {
  //   const bearerHeader = req.headers["authorization"];
  //   if (typeof bearerHeader !== "undefined") {
  //     const bearer = bearerHeader.split(" ");
  //     const bearerToken = bearer[1];
  //     const result = await authClient.verify({
  //       accessToken: bearerToken,
  //     });
  //     logger.debug("VerifyToken", result);
  //     next();
  //   } else {
  //     logger.error("VerifyToken", "No token");
  //     res.sendStatus(401);
  //   }
  // } catch (e) {
  //   logger.error(e);
  //   res.sendStatus(401);
  // }
}

export { logRequest, VerifyToken };
