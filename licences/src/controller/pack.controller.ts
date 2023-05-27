import express from "express";
import httpStatus from "http-status";
import { createPackService, deletePackService, getPackService, getPacksService, updatePackService } from "../services/pack.service";

const createPackServiceController = async (req: any, res: any) => {
  try
  {
    const pack = await createPackService(req.body);
    return res.status(httpStatus.CREATED).json(pack);
  }
  catch(err)
    {
        console.log(err);
        return res.status(400).json(err);
    }
};

const getPackController = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const pack = await getPackService(+id);
        return res.status(httpStatus.OK).json(pack);
    } catch (err) {
        return res.status(400).json(err);
    }
};

const getPacksController = async (req: any, res: any) => {
    try {
        const tenantId  = req.query?.tenantId || undefined;
        let packs;
        if (tenantId) {
             packs = await getPacksService(+tenantId);
        }

        else
            packs = await getPacksService();
        return res.status(httpStatus.OK).json(packs);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};

const updatePackController = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const pack = await updatePackService(+id, req.body);
        return res.status(httpStatus.OK).json(pack);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};

const deletePackController = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const pack = await deletePackService(+id);
        return res.status(httpStatus.OK).json(pack);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err)
    }
}

export {
    createPackServiceController,
    getPackController,
    getPacksController,
    updatePackController,
    deletePackController
};
