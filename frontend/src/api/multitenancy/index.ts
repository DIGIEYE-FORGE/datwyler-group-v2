import { env } from "../../utils/env";
import axios from "axios";
import { User } from "../../utils";

export default class MultiTenancyApi {
  private api = axios.create({
    // baseURL: env.VITE_AUTH_API,
    // baseURL: "http://localhost:4000",
    baseURL: `http://${window.location.hostname}:4000`,
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


  public async removeUserFromTenant(userId:string, tenantId: string) {
    try{
    await this.api.patch(`/tenant/${tenantId}/remove-user`, {
      userId,
    });
  }
  catch(err){
    throw err;
  }
}

}
