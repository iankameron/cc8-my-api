exports.up = function(knex, Promise) {
  return knex.schema.createTable("centers", t => {
    t.increments().index();
    t.string("name", 60).notNullable();
    t.string("address").notNullable();
    t.integer("max_lanes").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("centers");
};
