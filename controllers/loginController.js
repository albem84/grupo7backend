const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const Role = require("../models/roleModel");
const bcrypt = require("bcrypt");
class LoginController {
  async token(req, res) {
    try {
      const tkload = { timestamp: Date.now() };
      const token = jwt.sign(tkload, process.env.REG_SECRET, {
        expiresIn: "10m",
      });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error creating article" });
    }
  }
  async login(req, res) {
    const { email, password } = req.body;
    try {
      //const user = await User.findOne({ where: { email } });
      const user = await User.findOne({
        where: { email },
        include: {
          model: Role,
          attributes: ["name"],
        },
      });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication failed. User not found." });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Authentication failed. Wrong password." });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SESSION_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Authentication successful", token });
    } catch (error) {
      res.status(500).json({ message: "Error de inicio de sesión" });
    }
  }
  async logOut(req, res) {
    try {
      res.json({ all: "5" });
    } catch (error) {
      res.status(500).json({ message: "Error fetching articles", error });
    }
  }
}
module.exports = new LoginController();
