const express = require("express");
const controller = require("./db_access/controller");

const app = express();

const setupServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/country", controller.countryGetAll);
  app.get("/country/:idOrName", controller.countryGet);
  app.post("/country", controller.countryPost);
  app.patch("/country/:idOrName", controller.countryModify);
  app.delete("/country/:idOrName", controller.countryDelete);
  return app;
};

module.exports = { setupServer };
