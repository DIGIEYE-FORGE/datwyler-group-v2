import { env } from "../../utils/env";
import axios from "axios";
import { User } from "../../utils";

export default class MultiTenancyApi {
  private api = axios.create({
    // baseURL: env.VITE_AUTH_API,
    baseURL: "http://localhost:4000",
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
}
