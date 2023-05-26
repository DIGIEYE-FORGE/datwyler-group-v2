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
exports.getallLicenseService = exports.getLicenseService = exports.createLicenseService = exports.updatedLicenseService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createLicenseService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const license = yield prisma.license.create({
        data,
    });
    return license;
});
exports.createLicenseService = createLicenseService;
const getLicenseService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const license = yield prisma.license.findUnique({
        where: {
            id: id,
        },
    });
    return license;
});
exports.getLicenseService = getLicenseService;
const getallLicenseService = () => __awaiter(void 0, void 0, void 0, function* () {
    const license = yield prisma.license.findMany();
    return license;
});
exports.getallLicenseService = getallLicenseService;
const updatedLicenseService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const license = yield prisma.license.update({
        where: {
            id: +id,
        },
        data,
    });
    return license;
});
exports.updatedLicenseService = updatedLicenseService;
