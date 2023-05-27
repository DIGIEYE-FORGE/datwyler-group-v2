"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePackService = exports.updatePackService = exports.getPacksService = exports.getPackService = exports.createPackService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createPackService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pack = yield prisma.pack.create({
                data: Object.assign({}, data)
            });
            return pack;
        }
        catch (error) {
            throw new Error(error || "error in create pack service");
        }
    });
}
exports.createPackService = createPackService;
function getPackService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pack = yield prisma.pack.findFirst({
                where: {
                    id: id
                }
            });
            return pack;
        }
        catch (error) {
            throw new Error(error || "error in get pack service");
        }
    });
}
exports.getPackService = getPackService;
function getPacksService(tenantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const packs = yield prisma.pack.findMany({
                where: {
                    tenantId: tenantId ? tenantId : undefined
                }
            });
            return packs;
        }
        catch (error) {
            throw new Error(error || "error in get packs service");
        }
    });
}
exports.getPacksService = getPacksService;
function updatePackService(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pack = yield prisma.pack.update({
                where: {
                    id: id,
                },
                data: Object.assign({}, data)
            });
            return pack;
        }
        catch (error) {
            throw new Error(error || "error in update pack service");
        }
    });
}
exports.updatePackService = updatePackService;
function deletePackService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pack = yield prisma.pack.delete({
                where: {
                    id: id,
                }
            });
            return pack;
        }
        catch (error) {
            throw new Error(error || "error in delete pack service");
        }
    });
}
exports.deletePackService = deletePackService;
