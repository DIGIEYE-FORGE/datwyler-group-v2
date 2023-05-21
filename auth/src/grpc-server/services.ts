import { AuthHandlers } from "../proto/authPackage/Auth";
import redis from "../common/redis";
import { DecodedToken, dataIdsSchema, verifySchema } from "../common/types";
import * as grpc from "@grpc/grpc-js";
import prisma from "../common/prisma";
import { verifyToken } from "../common";
import { UserTenantResponse } from "../proto/multi_tenancy_package/UserTenantResponse";
import { GetUsersResponse } from "../proto/authPackage/GetUsersResponse";

export const GetUsers: AuthHandlers["GetUsers"] = (req, res) => {
  const { ids } = dataIdsSchema.parse(req.request);
  prisma.user
    .findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
      },
    })
    .then((users) => {
      const response: GetUsersResponse = {
        users: users.map((user) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar || undefined,
        })),
      };
      res(null, response);
    })
    .catch((err) => {
      res({
        code: grpc.status.INTERNAL,
        message: JSON.stringify(err),
      });
    });
};

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
        message: JSON.stringify(err),
      });
    });
};

export const handlers: AuthHandlers = {
  Verify: verify,
  GetUsers: GetUsers,
};
