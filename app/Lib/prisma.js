// lib/prisma.js
// Use perplexity AI for reference but the code was written myself

import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;


