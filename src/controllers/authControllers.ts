import prisma from "../models/user.js";
import type { Request, Response } from "express";
import { generateToken } from "../services/auth.servicio.js";
import {
  hashPassword,
  comparePasswords
} from "../services/password.services.js";


//--------------------------------------------------------------------------
// Register

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email) {
      res.status(400).json({
        message: "Email is required",
      });
      return;
    }

    if (!password) {
      res.status(400).json({
        message: "Password is required",
      });
      return;
    }

    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    const user = await prisma.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    console.log(user);
    const token = await generateToken(user);
    console.log(token);
    res.status(201).json({
      message: "User registered successfully",
      token,
      // Con este token el frontend puede mantener la sesión activa del usuario (logeado)
    });
  } catch (error: any) {
    if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
      res.status(400).json({
        error: "Email already exists",
      });
    }

    console.log(error);
    res.status(500).json({
      error: "Error en el registro",
    });
  }
};

//--------------------------------------------------------------------------
// Login

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email) {
      res.status(400).json({
        message: "Email is required",
      });
      return;
    }

    if (!password) {
      res.status(400).json({
        message: "Password is required",
      });
      return;
    }

    const user = await prisma.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }
    // En el curso el usa passwordMatch
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        error: "Invalid password",
      });
      return;
    }

    const token = await generateToken(user);
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error in login",
    });
  }
};
