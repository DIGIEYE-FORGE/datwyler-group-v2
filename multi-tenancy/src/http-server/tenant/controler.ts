import express, { Request, Response } from "express";
import { Router } from "express";
import TenantService from "./service";
import {
  queryPramsSchema,
  createTenantSchema,
  updateTenantSchema,
  addUserSchema,
} from "./dto";
import { z } from "zod";
import logger from "../../commun/logger";

class TenantController {
  private router: Router;
  private service: TenantService;

  constructor() {
    this.router = express.Router();
    this.service = new TenantService();
  }

  public getRouter() {
    this.router.get("/", async (req, res) => {
      try {
        const query = queryPramsSchema.parse(req.query);
        const result = await this.service.findMany(query);
        res.send(result);
      } catch (err) {
        if (err instanceof z.ZodError) {
          res.status(400).send(err.issues);
          return;
        } else {
          res.status(400).send(err);
        }
      }
    });

    this.router.get("/:id", async (req, res) => {
      logger.debug("req.params.id", req.params.id);
      try {
        const id = z.number().int().parse(+req.params.id);
        const result = await this.service.findUnique(id);
        if (!result) {
          res.status(404).send(["Not found"]);
          return;
        }

        res.send(result);
      } catch (err) { }
    });

    this.router.post("/", async (req, res) => {
      try {
        const data = createTenantSchema.parse(req.body);
        const result = await this.service.create(data);
        res.send(result);
      } catch (err) {
        if (err instanceof z.ZodError) {
          res.status(400).send(err.issues);
          return;
        } else {
          res.status(400).send(err);
        }
      }
    });

    this.router.patch("/:id", async (req, res) => {
      try {
        const id = z.number().int().parse(+req.params.id);
        const data = updateTenantSchema.parse(req.body);
        const result = await this.service.update(id, data);
        if (!result) {
          res.status(404).send(["Not found"]);
          return;
        }
        res.send(result);
      } catch (err) {
        if (err instanceof z.ZodError) {
          res.status(400).send(err.issues);
          return;
        } else {
          res.status(400).send(err);
        }
      }
    });

    this.router.patch("/:id/add-user", async (req, res) => {
      try {
        const id = z.number().int().parse(+req.params.id);

        const user = addUserSchema.parse(req.body);
        const result = await this.service.addUser(id, user);
        if (!result) {
          res.status(404).send(["Not found"]);
          return;
        }
        res.send(result);
      } catch (err) {
        if (err instanceof z.ZodError) res.status(400).send(err.errors);
        else {
          const error: any = err;
          res.status(400).send([error.message]);
        }
      }
    });

    this.router.patch("/:id/remove-user", async (req, res) => {
      try {
        const id = z.number().int().parse(+req.params.id);
        const { userId } = z
          .object({ userId: z.number().int() })
          .parse(req.body);
        const result = await this.service.removeUser(id, userId);
        if (!result) {
          res.status(404).send(["Not found"]);
          return;
        }
        logger.debug("removeUser", result);

        res.status(200).send(result);
      } catch (err) {
        if (err instanceof z.ZodError) res.status(400).send(err.errors);
        else {
          const error: any = err;
          res.status(400).send([error.message]);
        }
      }
    });

    this.router.get("/:id/users", async (req: Request, res: Response) => {
      try {
        const tenantId = z.number().int().parse(+req.params.id);
        const result = await this.service.getTenantUsers(tenantId);

        res.send(result.filter((user: any) => user.firstName));
      } catch (err) {
        if (err instanceof z.ZodError) res.status(400).send(err.errors);
        else {
          const error: any = err;
          res.status(400).send([error.message]);
        }
      }
    });

    this.router.delete("/:id", async (req, res) => {
      try {
        const id = z.number().int().parse(+req.params.id);
        const result = await this.service.delete(id);
        if (!result) {
          res.status(404).send(["Not found"]);
          return;
        }
        res.send(result);
      } catch (err) {
        if (err instanceof z.ZodError) res.status(400).send(err.errors);
        else {
          const error: any = err;
          res.status(400).send([error.message]);
        }
      }
    });

    return this.router;
  }

}

export default TenantController;
