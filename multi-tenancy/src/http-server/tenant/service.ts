import { Tenant, UserTeanant } from "@prisma/client";
import prisma from "../../commun/prisma";
import {
  CreateTenantDto,
  QueryParamsDto,
  UpdateTenantDto,
  AddUserDto,
} from "./dto";
import licenseClient from "../../license-client";
import { LicenseRequest } from "../../proto/licensePackage/LicenseRequest";
import authClient from "../../auth-client";

class TenantService {
  public async findMany(params: QueryParamsDto) {
    const result = await prisma.tenant.findMany({
      where: params.where ? JSON.parse(params.where) : undefined,
      orderBy: params.orderBy ? JSON.parse(params.orderBy) : undefined,
      include: params.include ? JSON.parse(params.include) : undefined,
      skip: params.skip ? +params.skip : undefined,
      take: params.take ? +params.take : undefined,
    });
    return result;
  }

  public async findUnique(id: number): Promise<any> {
    const result = await prisma.tenant.findUnique({
      where: { id },
      include: {
        children: {
          select: {
            id: true,
            name: true,
          },
        },
        users: true,
      },
    });
    // if (result && result.children.length > 0)
    //   return {
    //     ...result,
    //     children: await Promise.all(
    //       result.children.map(async (child) => {
    //         return await this.findUnique(child.id);
    //       })
    //     ),
    //   };
    return result;
  }

  public async create(data: CreateTenantDto): Promise<Tenant> {
    return await prisma.tenant.create({ data });
  }

  public async update(
    id: number,
    data: UpdateTenantDto
  ): Promise<Tenant | undefined> {
    return await prisma.tenant.update({ where: { id }, data });
  }

  public async addUser(
    tenantId: number,
    user: AddUserDto
  ): Promise<Tenant | undefined> {
    const data: LicenseRequest = {
      tenantId: tenantId,
      type: user.role,
    };
    const res = await licenseClient.getPermission(data);
    if (res?.permission) {
      await licenseClient.AffectLicense({
        licenseRequest: data,
        licenseId: res.licenseId,
        injectedId: user.id,
      });
    } else throw new Error("Permission denied");

    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: { id: user.id },
    });

    await authClient.addTenantToUser({
      id: user.id,
      tenantId: tenantId,
    });

    return await prisma.tenant.update({
      where: { id: tenantId },
      include: { users: true },
      data: {
        users: {
          connectOrCreate: {
            where: { userId_tenantId: { tenantId: tenantId, userId: user.id } },
            create: { role: user.role, userId: user.id },
          },
        },
      },
    });
  }

  public async removeUser(
    tenantId: number,
    userId: number
  ): Promise<UserTeanant | null> {
    const userTeanant = await prisma.userTeanant.findUnique({
      where: { userId_tenantId: { tenantId, userId } },
    });

    if (!userTeanant) return null;

    await prisma.userTeanant.delete({
      where: { userId_tenantId: { tenantId, userId } },
    });

    await authClient.removeTenantFromUser({
      id: userId,
      tenantId: tenantId,
    });

    await licenseClient.RemoveAffectation({
      deletedId: userId,
      licenseRequest: {
        tenantId: tenantId,
        type: userTeanant.role,
      },
    });

    return userTeanant;
  }
}

export default TenantService;
