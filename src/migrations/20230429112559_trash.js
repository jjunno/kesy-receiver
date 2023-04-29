/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('trashes', function (table) {
    table.increments('id');
    table.string('uuid', 36).unique();
    table.decimal('latitude', 10, 8).nullable();
    table.decimal('longitude', 11, 8).nullable();
    table.decimal('accuracy', 6, 2).nullable();

    table.timestamps({ useCamelCase: true });
    table.boolean('deleted').defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('trashes');
};
