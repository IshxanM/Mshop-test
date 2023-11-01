require("dotenv").config();
const sequelize = require("./db");
const express = require("express");

const models = require("./models/models");
const router = require("./routes/index");
const PORT = process.env.PORT || 3003;
const cors = require("cors");
const app = express();
const fileupload = require("express-fileupload");
const path = require("path");
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileupload({}));

app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log("ок", "Сервер запущен на порту ", PORT);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
