const sequelize = require("../config/database");
const User = require("./usersModel");
const Article = require("./articleModel");
const Role = require("./roleModel");
const Selection = require("./selectionModel");
User.hasMany(Selection, { foreignKey: "userId" });
User.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(User, { foreignKey: "roleId" });
Selection.belongsTo(User, { foreignKey: "userId" });
Selection.belongsTo(Article, { foreignKey: "articleId" });
Article.belongsTo(User, { foreignKey: "authorId" });
User.hasMany(Article, { foreignKey: "authorId" });
module.exports = {
  sequelize,
  User,
  Article,
  Role,
  Selection,
};
sequelize.sync().then(() => {
  console.log("Database & tables created!");
});
