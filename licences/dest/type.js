"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delteAffictationType = exports.affectType = exports.protoType = void 0;
const zod_1 = require("zod");
const type = zod_1.z.enum(["USER", "ADMIN", "DATACENTER"]);
const LicenseType = zod_1.z.object({
    description: zod_1.z.string().optional(),
    tenantId: zod_1.z.number(),
    startDate: zod_1.z.date().optional(),
    expiredAt: zod_1.z.date().optional(),
    numberUser: zod_1.z.number(),
    numberAdmin: zod_1.z.number(),
    numberDataCenter: zod_1.z.number(),
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
