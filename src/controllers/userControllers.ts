import type { Request, Response } from "express";
import { hashPassword } from "../services/password.services.js";
import prisma from "../models/user.js";
import { parse } from "path";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

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

    // Hash the password before storing it
    const hashedPassword = await hashPassword(password);
    const user = await prisma.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully", user: user });
  } catch (error: any) {
    if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
      res.status(400).json({
        error: "Email already exists",
      });
    }

    console.log(error);
    res.status(500).json({
      error: "Hubo un error, pruebe mas tarde",
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await prisma.findMany();
    res.status(200).json({ users });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      error: "Hubo un error, pruebe mas tarde",
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.id!); // añadí ! para cerrar la alerta

  try {
    const user = await prisma.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      res.status(404).json({
        error: "Usuario no encontrado",
      });
      return;
    }
    res.status(200).json({ user });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      error: "Hubo un error, pruebe mas tarde",
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.id!); // añadí ! para cerrar la alerta
  const { email, password } = req.body;
  try {
    let dataToUpdate: any = { ...req.body };

    if (password) {
      const hashedPassword = await hashPassword(password);
      dataToUpdate.password = hashedPassword;
    }

    if (email) {
      dataToUpdate.email = email;
    }

    const user = await prisma.update({
      where: {
        id: userId,
      },
      data: dataToUpdate,
    });

    res.status(200).json({ user });
  } catch (error: any) {
    if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
      res.status(400).json({
        error: "Email already exists",
      });
    } else if (error?.code === "P2025") {
      res.status(404).json({
        error: "Usuario no encontrado",
      });
    } else {
      console.log(error);
      res.status(500).json({
        error: "Hubo un error, pruebe mas tarde",
      });
    }
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.id!); // añadí ! para cerrar la alerta
  try {
    await prisma.delete({
      where: {
        id: userId,
      },
    });
    res.status(200).json({
      message: `El usuario ${userId} ha sido eliminado`,
    }).end();
  } catch (error: any) {
    if (error?.code === "P2025") {
      res.status(404).json({
        error: "Usuario no encontrado",
      });
    } else {
      console.log(error);
      res.status(500).json({
        error: "Hubo un error, pruebe mas tarde",
      });
    }
  }
};
