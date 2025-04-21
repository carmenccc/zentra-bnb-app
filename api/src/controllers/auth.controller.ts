import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { BadRequestError } from "../errors/bad-request-error.js";
import { CustomError } from "../errors/custom-error.js";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  // Retrieve request data
  const { email, username, password } = req.body;

  // Check if email exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new BadRequestError("Email in use");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  // Success message
  res.status(201).json({
    message: "User registered",
    user: { id: newUser.id, email: newUser.email },
  });
};
