import { env } from "../../utils/env";
import axios from "axios";
import { User } from "../../utils";
import { useProvider } from "../../components/provider";
import { AppContext } from "../../App";
import { z } from "zod";
type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

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
    .min(2, {
      message: "Last name must be at least 2 characters",
    })
    .regex(/^\w[\w ]*\w$/, {
      message: "Last name can only contain letters and spaces",
    }),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/)
    .optional(),
  role: z.enum(["USER", "ADMIN"]),
});

export type RegisterUser = z.infer<typeof registerSchema>;

export default class AuthApi {
  private accessToken: string;
  private refreshToken: string;
  private api = axios.create({
    baseURL: env.VITE_AUTH_API,
  });

  constructor({
    accessToken = "",
    refreshToken = "",
  }: {
    accessToken?: string;
    refreshToken?: string;
  } = {}) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${refreshToken}`;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    this.api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const res = await this.api.post("/login", { email, password });
    this.setAccessToken(res.data.accessToken);
    this.setRefreshToken(res.data.refreshToken);
    return res.data;
  }

  async logout(): Promise<void> {
    await this.api.post("/logout", {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    });
  }

  async verify(): Promise<User> {
    const res = await this.api.get("/me");
    return res.data;
  }

  async refresh() {
    const res = await this.api.post("/refresh", {
      refreshToken: this.refreshToken,
    });
    return res.data;
  }
  async register(user: RegisterUser) {
    const { role, ...data } = registerSchema.parse(user);
    const res = await this.api.post("/register", data);
    return res.data;
  }
}
