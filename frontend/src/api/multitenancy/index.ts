import { env } from "../../utils/env";
import axios from "axios";
import { Params, Tenant, User, convertParams } from "../../utils";
import { da } from "date-fns/locale";

export default class MultiTenancyApi {
  private api = axios.create({
    baseURL: env.VITE_MULTITENANCY_API,
    // baseURL: `http://${window.location.hostname}:4000`,
  });

  constructor({
    accessToken = "",
  }: {
    tenantId: number | undefined;
    accessToken?: string;
    refreshToken?: string;
  }) {
    this.api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  public async getUsers({
    tenantId,
  }: {
    tenantId: number | undefined;
  }): Promise<User[]> {
    if (!tenantId) return [];
    const response = await this.api.get(`/tenant/${tenantId}/users`);
    return response.data;
  }

  public async addUserToTenant({
    user,
    tenantId,
  }: {
    user: {
      id: number;
      role: "ADMIN" | "USER";
    };
    tenantId: number | undefined;
  }) {
    const res = await this.api.patch(`/tenant/${tenantId}/add-user`, user);
    return res.data;
  }

  public async getTenants({
    tenantId
  }: {
    tenantId: number | undefined;
  }): Promise<Tenant[]> {
    if (!tenantId) return [];
    const res = await this.api.get(`/tenant/`, {
      params: {
        take: 1000,
        where: JSON.stringify({ parentId: tenantId }),
        include: JSON.stringify({
          _count: true,
          children: {
            include: {
              _count: true,
            },
          },
        }),
      },
    });
    return res.data;
  }

  public async removeUserFromTenant({ userId, tenantId }: { userId: number | undefined, tenantId: number | undefined }) {

    if (!userId || !tenantId)
      throw new Error("userId or tenantId is undefined");
    await this.api.patch(`/tenant/${tenantId}/remove-user`, {
      userId,
    });
  }

  public async addEditTenant({ id, name, parentId }: { id?: number; name: string; parentId: number }) {
    if (id) {
      const res = await this.api.patch(`/tenant/${id}`, {
        name,
        parentId,
      });
      return res.data;
    }
    const res = await this.api.post(`/tenant/`, {
      name,
      parentId,
    });
    return res.data;
  }

  public async deleteTenant({ id }: { id: number }) {
    await this.api.delete(`/tenant/${id}`);
  }

}
