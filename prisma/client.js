import { PrismaClient } from "@prisma/client";

let prisma

// temporal
const mode = "DEV"

if (mode == "PRODUCTION") {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

export { prisma }