import { env } from "../../utils/env";
import axios from "axios";
import {
  Device,
  Group,
  ManyResponse,
  Params,
  User,
  convertParams,
} from "../../utils";
type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export default class BackendApi {
  private api = axios.create({
    // baseURL: env.VITE_AUTH_API,
    baseURL: "http://localhost:3001",
  });

  constructor({
    tenantId = undefined,
    accessToken = "",
    refreshToken = "",
  }: {
    tenantId: number | undefined;
    accessToken?: string;
    refreshToken?: string;
  }) {
    this.api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${refreshToken}`;
    if (tenantId) this.api.defaults.headers.common["tenant-id"] = tenantId;
  }

  async getDevices(params: Params): Promise<ManyResponse<Device>> {
    const res = await this.api.get("/device", {
      params: convertParams(params),
    });
    return res.data;
  }
  async getGroups(params: Params): Promise<ManyResponse<Group>> {
    const res = await this.api.get("/group", {
      params: convertParams(params),
    });
    return res.data;
  }
}
