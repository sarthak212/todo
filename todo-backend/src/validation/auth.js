const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function registerValidation(email, password) {
  if (!email || !password) {
    return { message: "Email and password are required" };
  }
  const alreadyUser = await prisma.user.findUnique({ where: { email: email } });
  if (alreadyUser) {
    return { message: "User already exists" };
  }
  return null;
}

module.exports = { registerValidation };
