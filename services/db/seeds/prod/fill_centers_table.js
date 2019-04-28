const Centers = require("../datastore/centers")["centers"];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("centers")
    .truncate()
    .then(function() {
      // Inserts using the centers object
      return knex("centers").insert(Centers);
    });
};
