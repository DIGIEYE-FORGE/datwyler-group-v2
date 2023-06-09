import { z } from "zod";

const roles = [
  "USER",
  "ADMIN",
] as const;

export type Role = typeof roles[number];

export const createTenantSchema = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  parentId: z.number().int().optional(),
});

export const updateTenantSchema = z.object({
  name: z.string().optional(),
  parentId: z.number().int().optional(),
});

export const queryPramsSchema = z.object({
  skip: z.string().regex(/^\d+$/).optional(),
  take: z.string().regex(/^\d+$/).optional(),
  orderBy: z.string().optional(),
  include: z.string().optional(),
  where: z.string().optional(),
});

export const addUserSchema = z.object({
  id: z.number().int(),
  role: z.enum(roles).optional(),
});

export type CreateTenantDto = z.infer<typeof createTenantSchema>;

export type UpdateTenantDto = z.infer<typeof updateTenantSchema>;

export type QueryParamsDto = z.infer<typeof queryPramsSchema>;

export type AddUserDto = z.infer<typeof addUserSchema>;
