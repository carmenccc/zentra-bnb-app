import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { BadRequestError } from "../errors/bad-request-error.js";
import jwt from "jsonwebtoken";

interface CurrentUserResponse {
  currentUser: string | jwt.JwtPayload | null;
}

const prisma = new PrismaClient();

export const getCurrentUser = async (
  req: Request,
  res: Response<CurrentUserResponse>
) => {
  // Check if there is a jwt in cookie
  if (!req.session?.jwt) {
    res.json({ currentUser: null });
    return;
  }

  // Verify if jwt is valid
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (err) {
    res.send({ currentUser: null });
  }
};

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

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: newUser.id,
      email: newUser.email,
    },
    process.env.JWT_KEY!
  );

  // Send jwt as cookie
  const { password: passwordData, ...userInfo } = newUser;

  req.session = {
    jwt: userJwt,
  };

  // Success message
  res.status(201).json({
    message: "New user registered",
    user: userInfo,
  });
};

export const login = async (req: Request, res: Response) => {
  // Retrieve request data
  const { email, password } = req.body;

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) throw new BadRequestError("Invalid credentials");

  // Check if password is correct
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) throw new BadRequestError("Invalid credentials");

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );

  // Send jwt as cookie
  const { password: passwordData, ...userInfo } = user;
  req.session = {
    jwt: userJwt,
  };

  // Success message
  res.status(200).json({ message: "Login successful", user: userInfo });
};

export const logout = async (req: Request, res: Response) => {
  req.session = null;
  res.status(200).json({ message: "Logout successful" });
};
