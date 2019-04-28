module.exports = (knex, Center) => params => {
  if (params.id === undefined) {
    return knex
      .select()
      .from("centers")
      .orderBy("id")
      .then(centers => centers.map(center => new Center(center)));
  } else {
    return knex
      .select()
      .from("centers")
      .where({ id: parseInt(params.id) })
      .then(centers => centers.map(center => new Center(center)));
  }
};
