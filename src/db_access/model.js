const knex = require("../knex");

const COUNTRY_DATA_TABLE = "country_data";

module.exports = {
  COUNTRY_DATA_TABLE,

  getAll(limit = 200) {
    return knex(COUNTRY_DATA_TABLE)
      .select({
        id: "id",
        name: "name",
        area: "area",
        population: "population",
        population_density: "population_density",
      })
      .limit(limit);
  },

  getById(id) {
    return knex(COUNTRY_DATA_TABLE)
      .select({
        id: "id",
        name: "name",
        area: "area",
        population: "population",
        population_density: "population_density",
      })
      .where("id", id);
  },

  getByName(name) {
    return knex(COUNTRY_DATA_TABLE)
      .select({
        id: "id",
        name: "name",
        area: "area",
        population: "population",
        population_density: "population_density",
      })
      .whereILike("name", `%${name}%`);
  },

  insertCountry(country) {
    return knex
      .insert({
        id: country.id,
        name: country.name,
        area: country.area,
        population: country.population,
        population_density: country.population_density,
      })
      .into(COUNTRY_DATA_TABLE);
  },

  modifyById(id, requestBody) {
    return knex(COUNTRY_DATA_TABLE)
      .where("id", id)
      .update(requestBody);
  },

  modifyByName(name, requestBody) {
    return knex(COUNTRY_DATA_TABLE)
      .where("name", name)
      .update(requestBody);
  },

  deleteById(id) {
    return knex(COUNTRY_DATA_TABLE)
      .where("id", id)
      .del();
  },

  deleteByName(name) {
    return knex(COUNTRY_DATA_TABLE)
      .where("name", name)
      .del();
  },
};
