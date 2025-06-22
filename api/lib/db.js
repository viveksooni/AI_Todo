import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

// Initialize `prisma` on `globalThis` if it doesn't exist
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}

export const prisma = globalForPrisma.prisma;

// Optional: Disconnect in production if needed
if (process.env.NODE_ENV === "production") {
  process.on("beforeExit", async () => {
    await prisma.$disconnect();
  });
}
