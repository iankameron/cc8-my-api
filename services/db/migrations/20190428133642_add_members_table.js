exports.up = function(knex, Promise) {
  return knex.schema.createTable("members", t => {
    // columns
    t.increments().index();
    t.string("name", 100).notNullable();
    t.integer("center_id").notNullable();
    t.integer("skill_level");
    // foreign keys
    t.foreign("center_id")
      .references("id")
      .inTable("centers")
      .onDelete("cascade");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("members");
};
