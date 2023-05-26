import express from "express";
import httpStatus from "http-status";
import { createLicenseService, getLicenseService, getallLicenseService, updatedLicenseService } from "../services/license.service";

const createlicenseController = async (req: any, res: any) => {
  try {
    const license = await createLicenseService(req.body);
    return res.status(httpStatus.CREATED).json(license);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const getlicenseController = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.query.tenantId;
    const license = await getLicenseService(+id,+tenantId);
    return res.status(httpStatus.OK).json(license);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getAlllicenseController = async (req: any, res: any) => {
  
  try {
    const { tenantId } = req.query.tenantId;
    const license = await getallLicenseService(tenantId);
    return res.status(httpStatus.OK).json(license);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const updatedlicenseController = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const license = await updatedLicenseService(id, req.body);
    return res.status(httpStatus.OK).json(license);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
export {
  updatedlicenseController,
  createlicenseController,
  getlicenseController,
  getAlllicenseController,
};
