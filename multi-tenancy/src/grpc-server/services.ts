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



const UserTenant: MultiTenancyHandlers["UserTenant"] = (call, callback) => {
  try {
    const { userId, tenantId } = userTenantSchema.parse(call.request);
    //check if user has access to tenant

    // TODO convert the code below to function and make it recursive
    logger.debug("UserTenant", call.request);
    // prisma.userTeanant.findMany({
    //   where: { tenantId, userId }, select: {
    //     tenant: {
    //       select: {
    //         id: true,
    //         children: {
    //           select: {
    //             id: true,
    //           },
    //         },
    //       },
    //     },
    //   }
    // }).then((userTenants) => {
    //   const tenants = userTenants.map(tenant => tenant.tenant.id)
    //   console.log("tenants", tenants);

    //   const children = userTenants.map(userTenant => userTenant.tenant.children.map(child => child.id
    //   )).flat()
    //   console.log("children", children);
    //   callback(null, {
    //     tenantIds: [...tenants, ...children]
    //   });
    // });

    prisma.tenant.findUnique({
      where: { id: tenantId },
      select: {
        id: true,
        children: {
          select: {
            id: true,
          },
        },
      },
    }).then((tenant) => {
      const children = tenant?.children.map(child => child.id) || []
      if (tenant) children.push(tenant.id)
      callback(null, {
        tenantIds: children
      });
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
    prisma.userTeanant
      .findMany({
        where: { userId },
        select: {
          tenant: {
            select: {
              name: true,
              id: true,
              children: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
          role: true
        }
      })
      ///////////// clean up /////////////
      .then((userTeanants) => {
        const children = userTeanants.map(UserTenant => UserTenant.tenant.children.map(child => ({
          ...child,
          role: UserTenant.role
        })
        )).flat()

        const tenants = userTeanants.map(tenant => ({
          name: tenant.tenant.name,
          id: tenant.tenant.id,
          role: tenant.role,
        }
        ))
        callback(null, {
          tenants: [...tenants, ...children]
        });
      });
  } catch (err) {
    console.log("--------------------", err);

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
