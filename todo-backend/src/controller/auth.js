const { PrismaClient } = require("@prisma/client");
const brcypt = require("bcrypt");
const { registerValidation } = require("../validation/auth");
const { avatarId } = require("../helpers/index");
const { generateRefreshToken } = require("../helpers/auth");

const prisma = new PrismaClient();

async function login(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  if (!brcypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid password" });
  }
  res.cookie("rtc", generateRefreshToken(user), {
    httpOnly: true,
  });
  return res.status(200).json({
    id: user.id,
    email: user.email,
    avatar: `https://avatar.iran.liara.run/public/${user.avatar_id}`,
  });
}

async function register(req, res) {
  const { email, password } = req.body;
  const validation = await registerValidation(email, password);
  if (validation) {
    return res.status(400).json(validation);
  }
  const hashedPassword = await brcypt.hash(password, 10);
  const randomAvatarId = avatarId[Math.floor(Math.random() * avatarId.length)];
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      avatar_id: String(randomAvatarId),
    },
  });
  res.cookie("rtc", generateRefreshToken(user), {
    httpOnly: true,
  });
  return res.status(201).json({
    id: user.id,
    email: user.email,
    avatar: `https://avatar.iran.liara.run/public/${user.avatar_id}`,
  });
}

async function logout(req, res) {
  res.clearCookie("rtc");
  return res.status(200).json({ message: "Sign out successfully" });
}

module.exports = { login, register, logout };
