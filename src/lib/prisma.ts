import { PrismaClient } from "../../generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaExtended = new PrismaClient().$extends(withAccelerate());

type ExtendedPrisma = typeof prismaExtended;

declare global {
  var prisma: ExtendedPrisma | undefined;
}

export const prisma: ExtendedPrisma = global.prisma || prismaExtended;

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
