/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("country_data", function(table) {
    table.increments("id").primary(); // Set this column as the primary key
    table
      .string("name", 64)
      .unique() // This is a constraint that prevents duplicate emails in the table
      .notNullable();
    table.decimal("area", 32);
    table.decimal("population", 32).notNullable();
    table.decimal("population_density", 64);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("country_data");
};
