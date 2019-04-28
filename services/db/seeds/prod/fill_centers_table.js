const Centers = require("../datastore/centers")["centers"];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries from members and centers
  return knex("centers")
    .del()
    .then(knex.raw("alter sequence centers_id_seq restart"))
    .then(function() {
      // Inserts using the centers object
      return knex("centers").insert(Centers);
    });
};
