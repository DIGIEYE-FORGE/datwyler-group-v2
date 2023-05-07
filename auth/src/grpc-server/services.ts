import { AuthHandlers } from "../proto/authPackage/Auth";
import logger from "../common/logger";
import redis from "../common/redis";
import env from "../common/env";
import jwt from "jsonwebtoken";
import { AddTenantSchema, DecodedToken, verifySchema } from "../common/types";
import * as grpc from "@grpc/grpc-js";
import prisma from "../common/prisma";
import { verifyToken } from "../common";

export const verify: AuthHandlers["Verify"] = (req, res) => {
  const { accessToken } = verifySchema.parse(req.request);
  redis
    .get(accessToken)
    .then((isBlackList) => {
      if (!isBlackList) {
        verifyToken(accessToken, (err, user) => {
          if (err) {
            res({
              code: grpc.status.UNAUTHENTICATED,
              message: "invalid token",
            });
          } else {
            const { email, id } = user as DecodedToken;
            res(null, { email, id });
          }
        });
      } else {
        res({
          code: grpc.status.UNAUTHENTICATED,
          message: "token revoked",
        });
      }
    })
    .catch((err) => {
      res({
        code: grpc.status.INTERNAL,
        message: "internal server error",
      });
    });
};

export const addTenant: AuthHandlers["AddTenant"] = (req, res) => {
  logger.debug("AddTenant", req.request);
  const { id, tenantId } = AddTenantSchema.parse(req.request);
  prisma.user
    .findUnique({ where: { id } })
    .then((user) => {
      if (!user)
        res({ code: grpc.status.NOT_FOUND, message: "user not found" });
      else {
        const tenants = [...new Set([...user.tenants, tenantId])];
        prisma.user
          .update({
            where: { id },
            data: { tenants },
          })
          .then(({ tenants: tenantIds }) => {
            res(null, { tenantIds });
          });
      }
    })
    .catch((err) => {
      res({
        code: grpc.status.INTERNAL,
        message: "internal server error",
      });
    });
};

export const removeTenant: AuthHandlers["RemoveTenant"] = (req, res) => {
  logger.debug("RemoveTenant", req.request);
  const { id, tenantId } = AddTenantSchema.parse(req.request);
  prisma.user
    .findUnique({ where: { id } })
    .then((user) => {
      if (!user)
        res({ code: grpc.status.NOT_FOUND, message: "user not found" });
      else {
        const tenants = [
          ...new Set(user.tenants.filter((t) => t !== tenantId)),
        ];
        prisma.user
          .update({
            where: { id },
            data: { tenants },
          })
          .then(({ tenants: tenantIds }) => {
            res(null, { tenantIds });
          });
      }
    })
    .catch((err) => {
      res({
        code: grpc.status.INTERNAL,
        message: "internal server error",
      });
    });
};

export const handlers: AuthHandlers = {
  Verify: verify,
  AddTenant: addTenant,
  RemoveTenant: removeTenant,
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJvdXNzYW1hQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3OTMwOTkxMSwiZXhwIjoxNjc5MzEwODExfQ.-Tynvvw1LrmnYOB5mWIMyGKkb9Xn9kt8A5laOnWA6gY

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJvdXNzYW1hQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3OTMwOTkxMSwiZXhwIjoxNjc5MzEwODExfQ.-Tynvvw1LrmnYOB5mWIMyGKkb9Xn9kt8A5laOnWA6gY
