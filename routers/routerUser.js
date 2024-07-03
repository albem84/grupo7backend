const express = require("express");
const authenticateTokenreg = require("../middlewares/token/authenticateTokenreg");
const authenticateToken = require("../middlewares/token/authenticateToken");
const UserRequest = require("../requests/usersRequest");
const { UsersController } = require("../controllers/index");
const router = express.Router();
router.post(
  "/register",
  authenticateTokenreg,
  UserRequest,
  UsersController.createUsers
);
router.get("/getarticles", authenticateToken, UsersController.getArticles);
router.post(
  "/selectarticle/:articleId",
  authenticateToken,
  UsersController.selectArticle
);
module.exports = router;
