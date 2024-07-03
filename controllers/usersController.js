const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const Article = require("../models/articleModel");
const Selection = require("../models/selectionModel");
const { validationResult } = require("express-validator");

class UsersController {
  async createUsers(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { firstname, lastname, email, password } = req.body;
      const roleId = 1;

      const hashedPassword = await bcrypt.hashSync(password, 10);

      const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        roleId,
      });
      res.status(201).json({ message: "Usuario Creado", user });
    } catch (error) {
      res.status(500).json({ message: "Error al Crear el usuario" });
    }
  }
  async getUser(req, res) {
    try {
      const user = await User.findByPk(req.body.userId, { include: Role });
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el usuario" });
    }
  }
  async getArticles(req, res) {
    try {
      const { id } = req.user;
      const userId = id;
      const user = await User.findByPk(userId, {
        include: {
          model: Selection,
          include: Article,
        },
      });
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      const selectedArticles = user.Selections.map(
        (selection) => selection.Article
      );
      res.status(200).json(selectedArticles);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener los artículos seleccionados" });
    }
  }
  async selectArticle(req, res) {
    const { articleId } = req.params;
    const { id } = req.user;
    const userId = id;
    try {
      const selection = await Selection.create({
        userId,
        articleId,
        selectedAt: new Date(),
      });
      return res.json(selection);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error selecting article", error });
    }
  }
}
module.exports = new UsersController();
