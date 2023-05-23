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
    // const res = await licenseClient.getPermission(data);
    // if (res?.permission) {
    //   await licenseClient.AffectLicense({
    //     licenseRequest: data,
    //     licenseId: res.licenseId,
    //     injectedId: user.id,
    //   });
    // } else throw new Error("Permission denied");

    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: { id: user.id },
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

    // await licenseClient.RemoveAffectation({
    //   deletedId: userId,
    //   licenseRequest: {
    //     tenantId: tenantId,
    //     type: userTeanant.role,
    //   },
    // });
    return userTeanant;
  }
  public async getRecTenantUsers(tenantId: number): Promise<any[]> {
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      select: {
        name: true,
        children: {
          select: {
            id: true,
          },
        },
        users: {
          select: {
            user: {
              select: {
                id: true,
              },
            },
            role: true,
          },
        },
      },
    });
    if (!tenant) return [];
    if (tenant.children.length === 0)
      return tenant.users.map((u) => ({
        userId: u.user.id,
        tenantName: tenant.name,
        role: u.role,
      }));
    const childrenUsers = await Promise.all(
      tenant.children.map(async (c) => this.getTenantUsers(c.id))
    );
    return [
      ...tenant.users.map((u) => ({
        userId: u.user.id,
        role: u.role,
        tenantName: tenant.name,
      })),
      ...childrenUsers.flat(),
    ];
  }

  public async getTenantUsers(tenantId: number): Promise<any> {
    const users = await this.getRecTenantUsers(tenantId);
    if (users.length === 0) return [];
    const authUsers = await authClient.getUsers({
      ids: users.map((u) => u.userId),
    });
    if (authUsers && authUsers.users) {
      const usersMap = Object.fromEntries(
        authUsers.users.map((u) => [u.id, u])
      );
      return users.map((u) => ({ ...usersMap[u.userId], ...u }));
    }
    return users;
  }
}

export default TenantService;
