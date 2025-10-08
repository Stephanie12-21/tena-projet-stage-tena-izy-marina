import { PrismaClient } from "../../generated/prisma";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

export default connectDB;
