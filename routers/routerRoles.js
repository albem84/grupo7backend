const express = require("express");
const authenticateToken = require("../middlewares/token/authenticateToken");
const { RolesController } = require("../controllers/index");
const router = express.Router();
router.post("/register", authenticateToken, RolesController.createRole);
router.get(
  "/getUsersWithRoles/:id",
  authenticateToken,
  RolesController.getUsersWithRoles
);
router.get("/deleteRole/:id", authenticateToken, RolesController.deleteRole);
router.get("/getRoles", authenticateToken, RolesController.getRoles);
module.exports = router;
