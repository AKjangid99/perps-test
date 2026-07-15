import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { authSchema } from "../types/zod.js";
import { createToken } from "../utils/auth.js";
import { sendValidationError } from "../utils/validation.js";
// import { userdata } from "../strore/userlist.js";
import { prisma } from "../utils/db.js";

export async function signup(req: Request, res: Response): Promise<void> {
  const parsedBody = authSchema.safeParse(req.body);
  if (!parsedBody.success) {
    sendValidationError(res, parsedBody.error);
    return;
  }
  const { username, password } = parsedBody.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  const token = createToken({ userId: newUser.id });

  res.status(201).json({
    message: "User created successfully",
    user: {
      id: newUser.id,
      username: newUser.username,
    },
    token
  }
  )
}

export async function signin(req: Request, res: Response): Promise<void> {
  const signInBody = req.body;
  const parsedBody = authSchema.safeParse(signInBody);
  if (!parsedBody.data || !req.Id) {
    res.status(403).json({ error: "Incorrect" });
    return;
  }

  const { username, password } = parsedBody.data;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const token = createToken({ userId: user.id });
  res.status(200).json({
    message: "Logged in successfully",
    user: {
      id: user.id,
      username: user.username,
    },
    token,
  });

}