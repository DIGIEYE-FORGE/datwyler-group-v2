import { z } from "zod";


const type = z.enum(["USER", "ADMIN", "DATACENTER"]);
const LicenseType = z.object({
	description: z.string().optional(),
	tenantId: z.number(),
	startDate: z.date().optional(),
	expiredAt: z.date().optional(),
	numberUser: z.number(),
	numberAdmin: z.number(),
	numberDataCenter: z.number(),
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
