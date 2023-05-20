import { env } from "../../utils/env";
import axios from "axios";
import {
  Alert,
  Device,
  Group,
  ManyResponse,
  Params,
  User,
  convertParams,
} from "../../utils";

export default class BackendApi {
  private api = axios.create({
    // baseURL: env.VITE_AUTH_API,
    baseURL: "http://localhost:4001",
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
  async getAlerts(params: Params): Promise<ManyResponse<Alert>> {
    const res = await this.api.get("/alert", {
      params: convertParams(params),
    });
    return res.data;
  }

  async acklowledgeAlerts({
    id,
    user,
  }: {
    id: number;
    user: string;
  }): Promise<Alert> {
    const res = await this.api.patch(`/alert/${id}`, {
      attributes: {
        user,
      },
      acknowledgedBy: id,
    });
    return res.data;
  }
}
