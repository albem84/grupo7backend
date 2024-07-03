require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const router = require("./routers/index.js");
const { notFoundHandler } = require("./middlewares/index.js");
const { Role } = require("./models/index");
const app = express();
const port = process.env.PORT || 4000;
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected!");
    return sequelize.sync(); // Sincroniza los modelos con la base de datos
  })
  .then(() => {
    console.log("Models synchronized!");
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });
app.use(notFoundHandler);

sequelize
  .sync({ force: false })
  .then(async () => {
    try {
      const [created] = await Role.findOrCreate({
        where: { name: "administrador" },
        defaults: { name: "administrador" },
      });
      if (created) {
        console.log('Rol "administrador" creado automáticamente.');
      } else {
        console.log('Rol "administrador" ya existe.');
      }
    } catch (error) {
      console.error('Error al crear el rol "administrador":', error);
    }
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to sync the database:", error);
  });
