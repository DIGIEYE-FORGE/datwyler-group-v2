import { Role, Tenant } from "@prisma/client";
import prisma from "../../commun/prisma";
import {
  CreateTenantDto,
  QueryParamsDto,
  UpdateTenantDto,
  AddUserDto,
} from "./dto";
import licenseClient from "../../license-client";
import authClient from "../../auth-client";
import { DeleteAffictationRequest } from "../../proto/licensePackage/DeleteAffictationRequest";
import { AffectTypeRequest } from "../../proto/licensePackage/AffectTypeRequest";

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
    const data : AffectTypeRequest = {
      tenantId,
      typeId: user.id,
      type: 0,
    };
    try{
    const res = await licenseClient.AffectLicense(data);
    if (res){
      return await prisma.tenant.update({
        where: { id: tenantId },
        data: {
          users: {
            connectOrCreate: {
              where: { id: user.id },
              create: { role: user.role, id: user.id },
            }
          }
        }
      });
    }
    else throw new Error("Permission denied");
    }
    catch(err){
      throw new Error("error in license service");
    }
  }

  public async removeUser(
    tenantId: number,
    userId: number
  ): Promise<Tenant | null> {
    const data : DeleteAffictationRequest = {
      type: 0,
      typeId: userId,
    };
    try{
    const res = await licenseClient.DeleteAffictation(data);
    if (res)
    {
    return await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        users: {
          disconnect: { id: userId },
        }
      }
    });
    }
    else throw new Error("Permission denied");
  }
    catch(err){
      throw new Error("error in license service");
    }
  }

  public async getRecTenantUsers(tenantId: number): Promise<{
    id: number;
    role: Role;
    tenantName: string;
  }[]> {
    const users = await prisma.user.findMany({
      include: { tenant: { select: { name: true } } },
      where: {
        OR: [
          { tenantId },
          { tenant: { parent: { id: tenantId } } },
          { tenant: { parent: { parent: { id: tenantId } } } },
          { tenant: { parent: { parent: { parent: { id: tenantId } } } } },
          { tenant: { parent: { parent: { parent: { parent: { id: tenantId } } } } } },
        ]
      }
    })
    return users.map(u => ({ id: u.id, role: u.role, tenantName: u.tenant.name }))
  }

  public async getTenantUsers(tenantId: number): Promise<any> {
    const users = await this.getRecTenantUsers(tenantId);
    if (users.length === 0) return [];
    const authUsers = await authClient.getUsers({
      ids: users.map((u) => u.id),
    });
    if (authUsers && authUsers.users) {
      const usersMap = Object.fromEntries(
        authUsers.users.map((u) => [u.id, u])
      );
      return users.map((u) => ({ ...usersMap[u.id], ...u }));
    }
    return users;
  }
}

export default TenantService;
