const { sign } = require("jsonwebtoken");
const generateAccessToken = (user) => {
  return sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (user) => {
  return sign({ email: user.email, id: user.id }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
