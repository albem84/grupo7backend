const express = require("express");
const authenticateToken = require("../middlewares/token/authenticateToken");
const authenticateTokenreg = require("../middlewares/token/authenticateTokenreg");
const { ArticleController } = require("../controllers/index");
const router = express.Router();
router.post("/register", authenticateToken, ArticleController.createArticle);
router.put("/update/:id", authenticateToken, ArticleController.updateArticle);
router.get(
  "/getallarticles",
  authenticateToken,
  ArticleController.getAllArticles
);
router.get(
  "/getarticlebyid/:id",
  authenticateToken,
  ArticleController.getArticleById
);
router.delete(
  "/deletearticle/:id",
  authenticateToken,
  ArticleController.deleteArticle
);
module.exports = router;
