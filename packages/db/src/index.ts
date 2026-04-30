import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prismaClient = globalForPrisma.prisma ?? (globalForPrisma.prisma = new PrismaClient());