exports.up = function(knex, Promise) {
  return knex.schema.createTable("sessions", t => {
    t.increments().index();
    t.integer("center_id").notNullable();
    t.timestamp("start_time")
      .notNullable()
      .defaultTo(knex.fn.now());
    // foreign keys
    t.foreign("center_id")
      .references("id")
      .inTable("centers")
      .onDelete("cascade");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("sessions");
};
