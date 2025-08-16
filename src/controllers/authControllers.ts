import prisma from "../models/user.js";
import { hashPassword } from "../services/password.services.js";
import type { Request, Response } from "express";
import { generateToken } from "../services/auth.servicio.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // TODO: Implement user registration logic

  try {
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    const user = await prisma.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    const token = generateToken(user);
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};
