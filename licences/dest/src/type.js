"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delteAffictationType = exports.affectType = exports.protoType = void 0;
const zod_1 = require("zod");
const type = zod_1.z.enum(["USER", "ADMIN", "DATACENTER"]);
const LicenseType = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    tenantId: zod_1.z.number().int().positive({ message: "tenantId must be a positive integer" }),
    parentId: zod_1.z.number().int().positive({ message: "parentId must be a positive integer" }).optional(),
    startDate: zod_1.z.string().optional(),
    expiredAt: zod_1.z.string().optional(),
    numberOfUsers: zod_1.z.number().int().positive({ message: "numberOfUsers must be a positive integer" }).optional().default(0),
    numberOfDataCenters: zod_1.z.number().int().positive({ message: "numberOfAdmins must be a positive integer" }).optional().default(0),
    users: zod_1.z.array(zod_1.z.number().int().positive({ message: "users must be a positive integer" })).optional(),
    dataCenters: zod_1.z.array(zod_1.z.number().int().positive({ message: "dataCenters must be a positive integer" })).optional(),
});
const updateLicenseType = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    tenantId: zod_1.z.number().int().positive({ message: "tenantId must be a positive integer" }),
    numberOfUsers: zod_1.z.number().int().positive({ message: "numberOfUsers must be a positive integer" }).optional(),
    numberOfDataCenters: zod_1.z.number().int().positive({ message: "numberOfAdmins must be a positive integer" }).optional(),
    startDate: zod_1.z.string().optional(),
    expiredAt: zod_1.z.string().optional(),
});
exports.protoType = zod_1.z.object({
    tenantId: zod_1.z.number().int().positive({ message: "tenantId must be a positive integer" }),
    type: zod_1.z.number().int().min(0).max(2),
});
exports.affectType = zod_1.z.object({
    licenseRequest: exports.protoType,
    licenseId: zod_1.z.number().int().positive({ message: "licenseId must be a positive integer" }),
    injectedId: zod_1.z.number().int().positive({ message: "injectedId must be a positive integer" }).optional(),
});
exports.delteAffictationType = zod_1.z.object({
    licenseRequest: exports.protoType,
    deletedId: zod_1.z.number().int().positive({ message: "deleteId must be a positive integer" }),
});
const PackType = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    tenantId: zod_1.z.number().int().positive({ message: "tenantId must be a positive integer" }),
    numberOfUsers: zod_1.z.number().int().positive({ message: "numberOfUsers must be a positive integer" }),
    numberOfDataCenters: zod_1.z.number().int().positive({ message: "numberOfDataCenters must be a positive integer" }),
    expiredAt: zod_1.z.string(),
    price: zod_1.z.number().int().positive({ message: "price must be a positive integer" }),
});
const UpdatePack = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    tenantId: zod_1.z.number().int().positive({ message: "tenantId must be a positive integer" }).optional(),
    numberOfUsers: zod_1.z.number().int().positive({ message: "numberOfUsers must be a positive integer" }).optional(),
    numberOfDataCenters: zod_1.z.number().int().positive({ message: "numberOfDataCenters must be a positive integer" }).optional(),
    expiredAt: zod_1.z.string().optional(),
    price: zod_1.z.number().int().positive({ message: "price must be a positive integer" }).optional(),
});
