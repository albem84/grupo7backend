const Article = require("../models/articleModel");
const User = require("../models/usersModel");
const { validationResult } = require("express-validator");
class ArticleController {
  async createArticle(req, res) {
    try {
      const { title, content } = req.body;
      const { id } = req.user;
      try {
        const authorId = id;
        const article = await Article.create({ title, content, authorId });
        return res.json(article);
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Error creating article", error });
      }
    } catch (error) {
      res.status(500).json({ message: "Error creating article" });
    }
  }
  async getArticleById(req, res) {
    const { id } = req.params;
    try {
      const article = await Article.findByPk(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      return res.json(article);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching article", error });
    }
  }
  async updateArticle(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      const article = await Article.findByPk(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      await article.update({ title, content });
      return res.json(article);
    } catch (error) {
      return res.status(500).json({ message: "Error updating article", error });
    }
  }
  async getAllArticles(req, res) {
    try {
      const { id } = req.user;
      const authorId = id;

      const articles = await Article.findAll({
        where: { authorId },
        include: {
          model: User,
          attributes: ["firstname", "lastname", "email"],
        },
      });
      return res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching articles", error });
    }
  }
  async deleteArticle(req, res) {
    const { id } = req.params;
    try {
      const result = await Article.destroy({ where: { id } });
      if (result === 0) {
        return res.status(404).json({ message: "Artículo no encontrado" });
      }
      return res.json({ message: "Artículo eliminado con ëxito" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al eliminar el Artículo", error });
    }
  }
}
module.exports = new ArticleController();
