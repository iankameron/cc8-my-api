module.exports = (knex, Center) => params => {
  return knex
    .select()
    .from("centers")
    .then(centers => centers.map(center => new Center(center)));
};
