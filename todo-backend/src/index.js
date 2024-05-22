const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const validateToken = require("./middleware/auth");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", require("./router/auth"));
app.use(validateToken);
app.use("/todolist", require("./router/todolist"));

app.get("/token_details", async (req, res) => {
  const user = req.user;
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  res.status(200).json({
    id: dbUser.id,
    email: dbUser.email,
    avatar: `https://avatar.iran.liara.run/public/${dbUser.avatar_id}`,
  });
});

app.listen(port, () => {
  console.log(`To do app listening on port ${port}`);
});
