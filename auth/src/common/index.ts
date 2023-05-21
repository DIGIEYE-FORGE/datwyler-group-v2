import jwt from "jsonwebtoken";
import env from "./env";
import { genSalt, hash, compareSync } from "bcrypt";
import { DecodedToken } from "./types";
import { Request, Response, NextFunction } from "express";
export class ServiceError extends Error {
  public code: number;
  constructor(message: string, code = 500) {
    super(message);
    this.name = "ServiceError";
    this.code = code;
  }
}

interface RequestWithUser extends Request {
  user?: DecodedToken;
}

import redis from "./redis";

export function generateAccessToken(user: { email: string; id: number }) {
  const { id, email } = user;
  return jwt.sign({ id, email }, env.JWT_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
  });
}

export function generateRefreshToken(user: { email: string; id: number }) {
  const { id, email } = user;
  return jwt.sign({ id, email }, env.JWT_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  });
}

export async function hashPassword(password: string) {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

export function verifyToken(
  token: string,
  callback: (err: any, decoded: any) => void
) {
  console.log("verifyToken", token);

  jwt.verify(token, env.JWT_SECRET, callback);
}

export function decodeToken(token: string): DecodedToken {
  return jwt.decode(token) as DecodedToken;
}

export function comparePassword(password: string, hashedPassword: string) {
  return compareSync(password, hashedPassword);
}

export async function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  console.log("i am here");
  const path = req.path;
  if (path === "/login" || path === "/refresh") {
    next();
    return;
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "unauthorized" });
  const isBlacklisted = await redis.get(token);
  if (isBlacklisted) return res.status(401).json({ error: "token revoked" });

  verifyToken(token, (err: any, docoded: any) => {
    if (err) {
      return res.status(401).json({ error: err });
    }
    const user = docoded as DecodedToken;
    req.user = user;
    if (path === "/register") {
      return res.status(401).json({ error: "unauthorized" });
    }
    next();
  });
}

export function handleNotFound(_req: Request, res: Response) {
  res.status(404).json({ error: "not found" });
}
