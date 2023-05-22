import { env } from "../../utils/env";
import axios from "axios";
import {
  Alert,
  Device,
  Group,
  ManyResponse,
  Params,
  Report,
  ReportDevice,
  User,
  convertParams,
} from "../../utils";
import { de } from "date-fns/locale";
type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export default class BackendApi {
  private api = axios.create({
    // baseURL: env.VITE_AUTH_API,
    // baseURL: "http://localhost:3001",
    baseURL: `http://${window.location.hostname}:3001`,
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
  async downloadFile(query: {
    name: string;
    type: string;
  }): Promise<ManyResponse<any>> {
    const res = await this.api.get(`/report/download/file`, {
      responseType: "blob",
      params: query,
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", query.name);
    document.body.appendChild(link);
    link.click();
    return res.data;

  }
  async getGroups(params: Params): Promise<ManyResponse<Group>> {
    const res = await this.api.get("/group", {
      params: convertParams(params),
    });
    return res.data;
  }

  async getReports(params: Params): Promise<ManyResponse<Report>> {
    const res = await this.api.get("/report", {
      params: convertParams(params),
    });
    return res.data;
  }

  async generateFile(props:ReportDevice): Promise<ManyResponse<any>> {
    if (props.groups) delete props.groups;
    const res = await this.api.post("/report/generate", props);
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