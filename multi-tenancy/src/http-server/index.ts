import express, { Express } from "express";
import env from "../commun/env";
import { logRequest, VerifyToken } from "./middlewars";
import TenantController from "./tenant/controler";
import logger from "../commun/logger";
import cors from "cors";
class HttpServer {
  private app: Express;
  private env = env;
  private tenantController: TenantController;

  constructor() {
    this.app = express();
    this.tenantController = new TenantController();
  }

  public start() {
    this.app.use(cors({
      origin: "*",
    }))
    this.app.use(express.json());
    this.app.use(logRequest);
    this.app.use(VerifyToken);

    this.app.use("/tenant", this.tenantController.getRouter());

    this.app.use((_req, res) => {
      res.status(404).send("Sorry can't find that!");
    });

    this.app.listen(this.env.HTTP_PORT, () => {
      logger.info(`http server listening on ${this.env.HTTP_PORT}`);
    });
  }
}

export default HttpServer;
