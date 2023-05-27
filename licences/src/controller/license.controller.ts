import express from "express";
import httpStatus from "http-status";
import { createLicenseService, getLicenseService, getallLicenseService, updatedLicenseService } from "../services/license.service";

type JsonValue = string | number | boolean | JsonObject | JsonArray | null;
export type JsonObject = { [Key in string]?: JsonValue };
export interface JsonArray extends Array<JsonValue> { }


export type Params = {
  pagination: {
    page: number;
    perPage: number;
  };
  where?: Record<string, any>;
  orderBy?: JsonObject;
  include?: JsonObject;

};

const createlicenseController = async (req: any, res: any) => {
    const license = await createLicenseService(req.body);
    return res.status(httpStatus.CREATED).json(license);
};

const getlicenseController = async (req: any, res: any) => {
    const { id } = req.params;
    const license = await getLicenseService(+id);
    return res.status(httpStatus.OK).json(license);
};

const getAlllicenseController = async (req: any, res: any) => {

    const tenantId  = req.query.tenantId;
    const license = await getallLicenseService(tenantId ? +tenantId : undefined);
    return res.status(httpStatus.OK).json(license);
};

const updatedlicenseController = async (req: any, res: any) => {
    const { id } = req.params;
    const license = await updatedLicenseService(+id, req.body);
    return res.status(httpStatus.OK).json(license);
};

export {
  updatedlicenseController,
  createlicenseController,
  getlicenseController,
  getAlllicenseController,
};
