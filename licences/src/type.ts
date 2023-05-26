import { z } from "zod";

  
const type = z.enum(["USER", "ADMIN", "DATACENTER"]);
const LicenseType = z.object({
	id: z.number().int().positive({ message: "id must be a positive integer" }),
	name: z.string().optional(),
	description: z.string().optional(),
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
	tenantId: z.number().int().positive({ message: "tenantId must be a positive integer" }),
	parentId: z.number().int().positive({ message: "parentId must be a positive integer" }).optional(),
	startDate: z.string().optional(),
	expiredAt: z.string().optional(),
	numberOfUsers: z.number().int().positive({ message: "numberofUsers must be a positive integer" }).optional().default(0),
	numberOfDataCenters: z.number().int().positive({ message: "numberofAdmins must be a positive integer" }).optional().default(0),
	users: z.array(z.number().int().positive({ message: "users must be a positive integer" })).optional(),
	dataCenters: z.array(z.number().int().positive({ message: "dataCenters must be a positive integer" })).optional(),
});

const updateLicenseType = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	tenantId: z.number().int().positive({ message: "tenantId must be a positive integer" }),
	numberOfUsers: z.number().int().positive({ message: "numberofUsers must be a positive integer" }).optional(),
	numberOfDataCenters: z.number().int().positive({ message: "numberofAdmins must be a positive integer" }).optional(),
	startDate: z.string().optional(),
	expiredAt: z.string().optional(),
});


export const protoType = z.object({
	tenantId: z.number().int().positive({ message: "tenantId must be a positive integer" }),
	type: z.number().int().min(0).max(2),
});

export const affectType = z.object({
	licenseRequest: protoType,
	licenseId: z.number().int().positive({ message: "licenseId must be a positive integer" }),
	injectedId: z.number().int().positive({ message: "injectedId must be a positive integer" }).optional(),
});

export const delteAffictationType = z.object({
	licenseRequest: protoType,
	deletedId: z.number().int().positive({ message: "deleteId must be a positive integer" }),
});

export type DeleteAffiType = z.infer<typeof delteAffictationType>;
export type LicenseType = z.infer<typeof LicenseType>;
export type ProtoType = z.infer<typeof protoType>;
export type UpdateType = z.infer<typeof updateLicenseType>;
