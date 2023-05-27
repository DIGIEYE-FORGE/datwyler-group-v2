import { env } from "../../utils/env";
import axios from "axios";
import {
  Alert,
  DashboardData,
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

export default class LicenseApi {
  private api = axios.create({
    // baseURL: env.VITE_AUTH_API,
    baseURL: `http://${window.location.hostname}:2000`,
  });

  constructor({
    tenantId = undefined,
    // accessToken = "",
    // refreshToken = "",
  }: {
    tenantId: number | undefined;
    // accessToken?: string;
    // refreshToken?: string;
  }) {
    // this.api.defaults.headers.common[
    //   "Authorization"
    // ] = `Bearer ${refreshToken}`;
    if (tenantId) this.api.defaults.headers.common["tenant-id"] = tenantId;
  }

  async getLicense(params: {
    tenantId?: number | undefined;
  }): Promise<ManyResponse<Report[]>> {
    console.log("getLicense", params);
    
    const res = await this.api.get("/license", {
      params: {
        tenantId: params?.tenantId || undefined,
      }
    });
    return res.data;
  }


  async addLicense(props: {
  name?: string;
  description?: string;
  tenantId?: number;
  parentId?: number;
  startDate?: string;
  expiredAt?: string;
  numberOfUsers?: number;
  numberOfDataCenters?: number;

  }): Promise<ManyResponse<Report[]>> {
    const res = await this.api.post("/license",props );
    return res.data;
  }
}