const express = require("express");
const { LoginController } = require("../controllers/index.js");
const authenticateTokenReg = require("../middlewares/token/authenticateTokenreg");
const router = express.Router();
router.get("/access_token", LoginController.token);
router.post("/login", authenticateTokenReg, LoginController.login);
router.get("/logout", authenticateTokenReg, LoginController.logOut);
module.exports = router;
