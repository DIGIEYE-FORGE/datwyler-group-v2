import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  firstName: z
    .string()
    .regex(/^\w[\w ]*\w$/, {
      message: "First name can only contain letters",
    })
    .min(2, {
      message: "First name must be at least 2 characters",
    }),
  lastName: z
    .string()
    .regex(/^\w[\w ]*\w$/, {
      message: "Last name can only contain letters",
    })
    .min(2, {
      message: "Last name must be at least 2 characters",
    }),
  avatar: z.any().optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{1,3}\s?\(?[0-9]{1,4}\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/)
    .optional(),
  attributes: z.record(z.any()).optional(),
});

export const updateUserSchema = z.object({
  email: z
    .string()
    .email({
      message: "Invalid email address",
    })
    .optional(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .optional(),
  firstName: z
    .string()
    .regex(/^\w[\w ]*\w$/, {
      message: "First name can only contain letters",
    })
    .optional(),
  lastName: z
    .string()
    .regex(/^\w[\w ]*\w$/, {
      message: "Last name can only contain letters",
    })
    .optional(),
  avatar: z.any().optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{1,3}\s?\(?[0-9]{1,4}\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/)
    .optional(),
  attributes: z.union([z.string(), z.record(z.any())]).optional(),
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const logoutSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const refreshSchema = z.object({
  refreshToken: z.string(),
});

export const verifySchema = z.object({
  accessToken: z.string().min(1),
});
export const dataIdsSchema = z.object({
  ids: z.array(z.number()),
});

export const updatePasswordSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
  id: z.number().optional(),
});

export const paramsSchema = z.object({
  take: z
    .string()
    .regex(/^\d+$/, {
      message: "take must be a number",
    })
    .optional(),
  skip: z
    .string()
    .regex(/^\d+$/, {
      message: "skip must be a number",
    })
    .optional(),
  cursor: z.string().optional(),
  where: z.string().optional(),
  select: z.string().optional(),
  orderBy: z.string().optional(),
  include: z.string().optional(),
});

export const AddTenantSchema = z.object({
  id: z.number(),
  tenantId: z.number(),
});

export type Login = z.infer<typeof loginSchema>;
export type Register = z.infer<typeof registerSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type Logout = z.infer<typeof logoutSchema>;
export type Refresh = z.infer<typeof refreshSchema>;
export type Verify = z.infer<typeof verifySchema>;
export type Params = z.infer<typeof paramsSchema>;
export type AddTenant = z.infer<typeof AddTenantSchema>;

export type DecodedToken = {
  id: number;
  email: string;
  exp?: number;
  iat?: number;
};
