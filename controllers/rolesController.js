const Role = require("../models/roleModel");
const { validationResult } = require("express-validator");
class RolesController {
  async getRoles(req, res) {
    try {
      const roles = await Role.findAll();
      return res.json(roles);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching roles", error });
    }
  }
  async createRole(req, res) {
    const { name } = req.body;
    try {
      const role = await Role.create({ name });
      return res.status(201).json(role);
    } catch (error) {
      return res.status(500).json({ message: "Error creating role", error });
    }
  }
  async deleteRole(req, res) {
    const { roleId } = req.params;
    try {
      const role = await Role.findByPk(roleId);
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }

      await role.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Error deleting role", error });
    }
  }
  async getUsersWithRoles(req, res) {
    try {
      const users = await User.findAll({
        include: [Role],
      });

      return res.json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching users with roles", error });
    }
  }
}

module.exports = new RolesController();
