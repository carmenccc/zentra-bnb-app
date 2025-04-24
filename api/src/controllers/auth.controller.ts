import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { UserData } from "@zentra/shared";
import { ApiResponse } from "@zentra/shared";

type CurrentUser = UserData | null;

const prisma = new PrismaClient();

export const getCurrentUser = async (
  req: Request,
  res: Response<ApiResponse<CurrentUser>>
) => {
  // Check if there is a jwt in cookie
  if (!req.session?.jwt) {
    res.json({ success: true, data: null });
    return;
  }

  // Verify if jwt is valid
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as {
      id: number;
    };
    // Fetch user info
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        createdAt: true,
      },
    });
    res.send({ success: true, data: user });
  } catch (err) {
    res.send({
      success: false,
      errors: [{ message: (err as Error).message || "Invalid access" }],
    });
  }
};

export const register = async (
  req: Request,
  res: Response<ApiResponse<null>>
) => {
  // Retrieve request data
  const { email, username, password } = req.body;

  // Check if email exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    // throw new BadRequestError("Email in use");
    res
      .status(200)
      .json({ success: false, errors: [{ message: "Email in use" }] });
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
  req.session = {
    jwt: userJwt,
  };

  // Success message
  res.status(201).json({ success: true, message: "New user registered" });
};

export const login = async (req: Request, res: Response<ApiResponse<null>>) => {
  // Retrieve request data
  const { email, password } = req.body;

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) throw new BadRequestError("Invalid credentials");

  // Check if password is correct
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    // throw new BadRequestError("Invalid credentials")
    res
      .status(200)
      .json({ success: false, errors: [{ message: "Invalid credentials" }] });
  }

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );

  // Send jwt as cookie
  req.session = {
    jwt: userJwt,
  };
  // Success message
  res.status(200).json({ success: true, message: "Login successful" });
};

export const logout = async (
  req: Request,
  res: Response<ApiResponse<null>>
) => {
  try {
    req.session = null;
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (err) {
    console.log(err);
    throw new BadRequestError(
      (err as Error)?.message || "Unkown error on logout"
    );
  }
};
