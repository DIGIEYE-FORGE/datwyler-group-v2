import prisma from "../common/prisma";
import redis from "../common/redis";
import express, { Request } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import env from "../common/env";
import { z } from "zod";
import fs from "fs";
import {
  paramsSchema,
  DecodedToken,
  registerSchema,
  refreshSchema,
  loginSchema,
  logoutSchema,
  updatePasswordSchema,
  updateUserSchema,
} from "../common/types";
import multiTenancyClient from "../multiy-tenancy-client";
interface RequestWithUser extends Request {
  user?: DecodedToken;
}
import { generateRefreshToken, hashPassword, verifyToken } from "../common";
import multer from "multer";

const app = express();
app.use(express.static("uploads"));
app.use(express.static("logs"));
app.use((req, res, next) => {
  next();
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(async (req: RequestWithUser, res, next) => {
  const path = req.path;
  if (path === "/login" || path === "/refresh" || path === "/register") {
    next();
    return;
  }
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "unauthorized" });
  const isBlacklisted = await redis.get(token);
  if (isBlacklisted) return res.status(401).json({ error: "token revoked" });
  verifyToken(token, (err, docoded) => {
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
});

app.post(
  "/register",
  multer({ storage: storage }).single("avatar"),
  async (req, res) => {
    try {
      if (req.file) {
        console.log("true conidtion req.file");
        req.body.avatar = req.file.filename || "";
      }
      const { password, ...rest } = registerSchema.parse(req.body);
      const hashedPassword = await hashPassword(password);
      const user = await prisma.user.create({
        data: {
          ...rest,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
        },
      });
      res.send(user);
    } catch (err) {
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }
      res.status(400).json({ error: err });
    }
  }
);
app.patch(
  "/update/:id",
  multer({ storage: storage }).single("avatar"),
  async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      if (req.file) {
        console.log("true conidtion req.file");
        req.body.avatar = req.file.filename || "";
      }
      const { password, ...rest } = updateUserSchema.parse(req.body);
      const hashedPassword = password
        ? await hashPassword(password)
        : undefined;
      const user = await prisma.user.update({
        where: { id },
        data: {
          ...rest,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
        },
      });
      if (!user)
        return res.status(404).json({ error: "user with id not found" });
      res.send(user);
    } catch (err) {
      if (err instanceof z.ZodError)
        res.status(400).json({ error: err.issues });
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }
      res.status(400).json({ error: err });
    }
  }
);

app.post("/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user || !compareSync(password, user.password)) {
      res.status(404).json({ error: "invalid credentials" });
      return;
    }

    const accessToken = generateAccessToken({
      email,
      id: user.id,
    });

    const refreshToken = generateRefreshToken({
      email,
      id: user.id,
    });
    res.send({
      accessToken,
      refreshToken,
      user: { ...user, password: undefined },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

app.patch("/update-password/:id", async (req, res) => {
  try {
    if (req.params.id) {
      const { oldPassword, newPassword } = updatePasswordSchema.parse(req.body);
      const password = await prisma.user.findUnique({
        where: {
          id: Number(req.params.id),
        },
        select: {
          password: true,
        },
      });
      if (!password || !compareSync(oldPassword, password.password)) {
        res.status(404).json({ error: "invalid credentials" });
        return;
      }
      await prisma.user.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          password: await hashPassword(newPassword),
        },
      });
      res.json({ message: "password updated" });
    } else {
      res.status(400).json({ error: "id is required" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

app.post("/logout", async (req, res) => {
  try {
    const { accessToken, refreshToken } = logoutSchema.parse(req.body);
    const result = {
      accessToken: jwt.decode(accessToken) as DecodedToken,
      refreshToken: jwt.decode(refreshToken) as DecodedToken,
    };
    redis.set(accessToken, "logged out", {
      EXAT: result.accessToken.exp,
    });
    redis.set(refreshToken, "logged out", {
      EXAT: result.refreshToken.exp,
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

app.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);
    const isBlacklisted = await redis.get(refreshToken);
    if (isBlacklisted) return res.status(401).json({ error: "token revoked" });
    verifyToken(refreshToken, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ error: err });
      }
      const { id, email } = user as DecodedToken;
      res.send({ accessToken: generateAccessToken({ id, email }) });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

app.get("/users", async (req, res) => {
  try {
    const params = paramsSchema.parse(req.query);
    const skip = params.skip ? +params.skip : undefined;
    const take = params.take ? +params.take : undefined;
    const orderBy = params.orderBy ? JSON.parse(params.orderBy) : undefined;
    const where = params.where ? JSON.parse(params.where) : {};
    const totalResult = await prisma.user.count({ where });
    const results = await prisma.user.findMany({
      skip,
      take,
      orderBy,
      where: { ...where },
      select: params.select ? JSON.parse(params.select) : undefined,
    });
    res.send({
      results,
      totalResult,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = +z.string().regex(/^\d+$/).parse(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      res.status(404).json({ error: "user not found" });
      return;
    }
    res.send(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const id = +z.string().regex(/^\d+$/).parse(req.params.id);
    const { password, ...rest } = registerSchema.parse(req.body);
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...rest,
        password: hashedPassword,
      },
    });
    return res.send(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/me", async (req: RequestWithUser, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
    });
    if (!user) {
      res.status(401).json({ error: "user not found" });
      return;
    }
    const result = await multiTenancyClient.getUserTenants({
      userId: user.id,
    });

    const tenants =
      result?.tenants?.map((el) => ({
        ...el,
        role: ["ADMIN", "USER"][el.role as number],
      })) || [];
    res.send({ ...user, password: undefined, tenants });
  } catch (err) {
    res.status(401).json(err);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.delete({
      where: { id },
    });
    res.send(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

function generateAccessToken({ id, email }: { email: string; id: number }) {
  return jwt.sign({ id, email }, env.JWT_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
  });
}

export default app;
