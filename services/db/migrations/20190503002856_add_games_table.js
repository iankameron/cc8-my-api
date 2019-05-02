exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", t => {
    t.increments().index();
    t.integer("session_id").notNullable();
    t.integer("member_id").notNullable();
    t.string("score_details", 30);
    t.integer("final_score");
    //foreign keys
    t.foreign("session_id")
      .references("id")
      .inTable("sessions")
      .onDelete("cascade");
    t.foreign("member_id")
      .references("id")
      .inTable("members")
      .onDelete("cascade");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("games");
};
