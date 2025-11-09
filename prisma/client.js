import { PrismaClient } from "@prisma/client";

/** @type {import('@prisma/client').PrismaClient}*/
let prisma

if (process.env.mode == "PRODUCTION") {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

export { prisma }