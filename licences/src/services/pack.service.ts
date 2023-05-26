import { PrismaClient } from "@prisma/client"
import { LicenseType, PackType, UpdatePackType, UpdateType } from "../type";
import { number } from "zod";

const prisma = new PrismaClient();


async function createPackService(data: PackType) {
    try {
        const pack = await prisma.pack.create({
            data: {
                ...data
            }
        });
        return pack;
    } catch (error) {
        throw new Error(error as string || "error in create pack service");
    }
}

async function getPackService(id: number) {
    try {
        const pack = await prisma.pack.findFirst({
            where: {
                id: id
            }
        });
        return pack;
    } catch (error) {
        throw new Error(error as string || "error in get pack service");
    }
}

async function getPacksService(tenantId?: number) {
    try {
        const packs = await prisma.pack.findMany({
            where: {
                tenantId: tenantId ? tenantId : undefined
            }
        });
        return packs;
    } catch (error) {
        throw new Error(error as string || "error in get packs service");
    }
}



async function updatePackService(id:number, data: UpdatePackType) {
    try {
        const pack = await prisma.pack.update({
            where: {
                id: id,
            },
            data: {
                ...data
            }
        });
        return pack;
    } catch (error) {
        throw new Error(error as string || "error in update pack service");
    }
}

async function deletePackService(id:number) {
    try {
        const pack = await prisma.pack.delete({
            where: {
                id: id,
            }
        });
        return pack;
    } catch (error) {
        throw new Error(error as string || "error in delete pack service");
    }
}

export {
    createPackService,
    getPackService,
    getPacksService,
    updatePackService,
    deletePackService
};