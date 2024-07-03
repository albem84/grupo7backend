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
router.get(
  "/getArticles",
  authenticateToken,
  UserRequest,
  UsersController.getArticles
);
router.post(
  "/selectArticle",
  authenticateToken,
  UserRequest,
  UsersController.selectArticle
);
module.exports = router;
