import type { User } from "../models/user.interface.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

export const generateToken = async (user: User): Promise<string> => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  //JWT_SECRET no puede recibir undefined, debe recibir un string si o si, por eso pasamos || "default_jwt_secret"

};
