import path from "path";
import * as grpc from "@grpc/grpc-js";
import { MultiTenancyHandlers } from "../proto/multi_tenancy_package/MultiTenancy";
import { z } from "zod";
import prisma from "../commun/prisma";
import logger from "../commun/logger";

const userTenantSchema = z.object({
  userId: z.number().int(),
  tenantId: z.number().int(),
});

const getMeSchema = z.object({
  userId: z.number().int(),
});

async function getSubtenants(tenantId: number) {
  return await prisma.tenant.findMany({
    where: {
      OR: [
        { id: tenantId },
        { parent: { id: tenantId } },
        { parent: { parent: { id: tenantId } } },
        { parent: { parent: { parent: { id: tenantId } } } },
        { parent: { parent: { parent: { parent: { id: tenantId } } } } },
      ],
    }
  })
}

const UserTenant: MultiTenancyHandlers["UserTenant"] = (call, callback) => {
  try {
    const { userId, tenantId } = userTenantSchema.parse(call.request);
    //TODO check if user has access to tenant

    // TODO convert the code below to function and make it recursive
    logger.debug("UserTenant", call.request);

    getSubtenants(tenantId)
      .then((tenants) => {
        callback(null, { tenantIds: tenants.map(tenant => tenant.id) });
      })

  } catch (err) {
    if (err instanceof z.ZodError) {
      callback(
        {
          code: grpc.status.INVALID_ARGUMENT,
          message: err.message,
        },
        null
      );
    }
    callback(
      {
        code: grpc.status.INVALID_ARGUMENT,
        message: "Invalid argument",
      },
      null
    );
  }
};

const GetMe: MultiTenancyHandlers["GetMe"] = (call, callback) => {
  logger.debug("GetMe", call.request);
  try {
    const { userId } = getMeSchema.parse(call.request);
    prisma.user.findUnique({
      where: { id: userId },
    }).then(async (user) => {
      if (!user) {
        callback(
          {
            code: grpc.status.NOT_FOUND,
            message: "User not found",
          },
          null
        );
      }
      else {
        const userTenants = await prisma.tenant.findMany({
          where: {
            OR: [
              { id: user.tenantId },
              { parent: { id: user.tenantId } },
              { parent: { parent: { id: user.tenantId } } },
              { parent: { parent: { parent: { id: user.tenantId } } } },
              { parent: { parent: { parent: { parent: { id: user.tenantId } } } } },
              { parent: { parent: { parent: { parent: { parent: { id: user.tenantId } } } } } },
            ]
          },
          orderBy: { id: "asc" }
        })
        callback(null, {
          tenants: userTenants.map(tenant => ({
            role: user.role,
            id: tenant.id,
            name: tenant.name,
          }))
        }
        )
      }
    })



  } catch (err) {
    console.log(err);

    if (err instanceof z.ZodError) {
      callback(
        {
          code: grpc.status.INVALID_ARGUMENT,
          message: err.message,
        },
        null
      );
    }
    callback(
      {
        code: grpc.status.INVALID_ARGUMENT,
        message: "Invalid argument",
      },
      null
    );
  }
};

const handlers: MultiTenancyHandlers = { UserTenant, GetMe };

export default handlers;
