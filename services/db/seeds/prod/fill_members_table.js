const Members = require("../datastore/members")["members"];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("members")
    .del()
    .then(() => knex.raw("ALTER SEQUENCE members_id_seq RESTART;"))
    .then(function() {
      // Inserts seed entries
      return knex("members").insert(Members);
    });
};
