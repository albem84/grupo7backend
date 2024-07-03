const express = require("express");
const router = express.Router();
const routerUser = require("./routerUser");
const routerLogin = require("./routerLogin");
const routerArticle = require("./routerArticles");
router.use("/auth", routerLogin);
router.use("/users", routerUser);
router.use("/article", routerArticle);
module.exports = router;
