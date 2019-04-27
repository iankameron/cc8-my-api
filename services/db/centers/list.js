module.exports = (knex, Center) => params => {
  console.log("got to DB");
  return knex
    .select()
    .from("centers")
    .then(centers => centers.map(center => new Center(center)));
};
