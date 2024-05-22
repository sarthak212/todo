const { verify } = require("jsonwebtoken");
async function validateToken(req, res, next) {
  if (!req.cookies) {
    return res.status(401).json({ message: "Access denied" });
  }
  const token = req.cookies.rtc;
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  try {
    const decoded = verify(token, process.env.REFRESH_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = validateToken;
