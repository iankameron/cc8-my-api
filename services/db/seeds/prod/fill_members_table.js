const Members = require("../datastore/members")["members"];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("members")
    .del()
    .then(knex.raw("alter sequence members_id_seq restart"))
    .then(function() {
      // Inserts seed entries
      return knex("members").insert(Members);
    });
};
