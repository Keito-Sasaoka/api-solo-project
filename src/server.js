const express = require("express");
const controller = require("./db_access/controller");
const path = require("path");

const app = express();

const setupServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // This configures templates for the frontend of the app.
  app.set("views", `${__dirname}/templates`);
  app.set("view engine", "ejs");

  /*
  This allows us to serve static files (html, css, etc.) from
  the public directory.
*/
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) => {
    res.render("/pages/index");
  });

  app.get("/country", controller.countryGetAll);
  app.get("/country/:idOrName", controller.countryGet);
  app.post("/country", controller.countryPost);
  app.patch("/country/:idOrName", controller.countryModify);
  app.delete("/country/:idOrName", controller.countryDelete);
  return app;
};

module.exports = { setupServer };
