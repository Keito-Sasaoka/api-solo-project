const express = require("express");
const controller = require("./db_access/controller");

const app = express();

const setupServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
  app.use(express.json());

  app.get("/country", controller.countryGet);
  app.post("/country", controller.countryPost);
  app.patch("/country/:idOrName", controller.countryModify);
  app.delete("/country/:idOrName", controller.countryDelete);
  return app;
};

module.exports = { setupServer };
