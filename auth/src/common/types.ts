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
  avatar: z.string().optional(),
  role: z.enum(["ADMIN", "USER"]).optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/)
    .optional(),
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
export type Logout = z.infer<typeof logoutSchema>;
export type Refresh = z.infer<typeof refreshSchema>;
export type Verify = z.infer<typeof verifySchema>;
export type Params = z.infer<typeof paramsSchema>;
export type AddTenant = z.infer<typeof AddTenantSchema>;

export type DecodedToken = {
  id: number;
  email: string;
  role: Role;
  exp?: number;
  iat?: number;
};

export type Role = "ADMIN" | "USER";



// "email": "oussamajamil01@gmail.com",
//   "password": "123456",
//     "firstName": "oussama",
//       "lastName": "jamil",
//         "role": "ADMIN",
//           "phoneNumber": "0682712855"