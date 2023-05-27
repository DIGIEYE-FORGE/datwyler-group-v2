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
    try {
        if (data.parentId) {
            const parent = yield prisma.license.findFirst({
                where: {
                    tenantId: data.parentId,
                    numberOfDataCenters: {
                        gte: data.numberOfDataCenters
                    },
                    numberOfUsers: {
                        gte: data.numberOfUsers
                    },
                    expiredAt: {
                        gte: data.expiredAt
                    }
                }
            });
            if (parent) {
                const license = yield prisma.license.create({
                    data: Object.assign(Object.assign({}, data), { parentId: parent.id })
                });
                if (license) {
                    const updateLicense = yield prisma.license.update({
                        where: {
                            id: parent.id
                        },
                        data: {
                            numberOfDataCenters: parent.numberOfDataCenters - data.numberOfDataCenters,
                            numberOfUsers: parent.numberOfUsers - data.numberOfUsers,
                        }
                    });
                    if (updateLicense)
                        return license;
                    else
                        yield prisma.license.delete({
                            where: {
                                id: license.id
                            }
                        });
                }
            }
            else
                throw new Error("data is not valid for create license");
        }
        else {
            const license = yield prisma.license.create({
                data: Object.assign({}, data)
            });
            return license;
        }
    }
    catch (err) {
        throw new Error(err || "data is not valid for create license");
    }
});
exports.createLicenseService = createLicenseService;
const getLicenseService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const license = yield prisma.license.findFirst({
            where: {
                id: id,
            },
        });
        return license;
    }
    catch (err) {
        throw new Error(err || "license not found");
    }
});
exports.getLicenseService = getLicenseService;
const getallLicenseService = (tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield prisma.license.count({
            where: {
                tenantId: tenantId || undefined
            }
        });
        const license = yield prisma.license.findMany({
            where: {
                tenantId: tenantId || undefined
            }
        });
        return {
            totalResult: count,
            results: license
        };
    }
    catch (err) {
        throw new Error(err || "license not found");
    }
});
exports.getallLicenseService = getallLicenseService;
const updatedLicenseService = (tenantId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const license = yield prisma.license.findUnique({
            where: {
                id: tenantId
            }
        });
        if (license) {
            let nbUsers, nbDataCenters;
            nbUsers = data.numberOfUsers - license.numberOfUsers;
            nbDataCenters = data.numberOfDataCenters - license.numberOfDataCenters;
            if (license === null || license === void 0 ? void 0 : license.parentId) {
                const parent = yield prisma.license.findFirst({
                    where: {
                        id: license.parentId,
                        numberOfDataCenters: {
                            gte: nbDataCenters
                        },
                        numberOfUsers: {
                            gte: nbUsers
                        },
                        expiredAt: {
                            gte: data.expiredAt
                        }
                    }
                });
                if (parent) {
                    const updateLicense = yield prisma.license.update({
                        where: {
                            id: license.id
                        },
                        data: Object.assign({}, data)
                    });
                    if (updateLicense) {
                        const updateParent = yield prisma.license.update({
                            where: {
                                id: parent.id
                            },
                            data: {
                                numberOfDataCenters: parent.numberOfDataCenters - nbDataCenters,
                                numberOfUsers: parent.numberOfUsers - nbUsers,
                            }
                        });
                        if (updateParent)
                            return updateLicense;
                        else {
                            yield prisma.license.delete({
                                where: {
                                    id: updateLicense.id
                                }
                            });
                        }
                    }
                }
                else {
                    throw new Error("data is not valid for update license");
                }
            }
            else {
                const license = yield prisma.license.update({
                    where: {
                        id: tenantId,
                    },
                    data,
                });
                return license;
            }
        }
        else
            throw new Error("license not found");
    }
    catch (err) {
        throw new Error(err || "data is not valid for update license");
    }
});
exports.updatedLicenseService = updatedLicenseService;
