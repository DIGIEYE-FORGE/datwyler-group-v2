import { env } from "../../utils/env";
import axios from "axios";
import {
  ManyResponse,
  Report,
  User,
} from "../../utils";

export default class LicenseApi {
  private api = axios.create({
    baseURL: env.VITE_LICENSE_API,
    // baseURL: `https://cms.itinfra.datwyler.com/license`,
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
    const res = await this.api.post("/license", props);
    return res.data;
  }
}