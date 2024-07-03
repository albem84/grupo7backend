const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Ajusta el path según tu estructura de proyecto

class Selection extends Model {}

Selection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    articleId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Articles",
        key: "id",
      },
    },
    selectedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Selection",
  }
);

module.exports = Selection;
