import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma.user;
// Antes era prisma.User, pero el modelo en schema.prisma se llama user (con u minúscula)
