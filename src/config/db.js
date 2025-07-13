const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Return a function that tries to connect
const connectToDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to PostgreSQL via Prisma");
  } catch (err) {
    console.error("Prisma connection error:", err.message);
    throw err;
  }
};

module.exports = { prisma, connectToDB };
