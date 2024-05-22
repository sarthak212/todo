const express = require("express");
const { login, register, logout } = require("../controller/auth");
const router = express.Router();

router.post("/sign-in", login);
router.post("/sign-up", register);
router.get("/logout", logout);

module.exports = router;
