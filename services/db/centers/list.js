module.exports = (knex, Center) => (params = { id: null }) => {
  if (params.id === null) {
    return knex
      .select()
      .from("centers")
      .orderBy("id")
      .then(centers => centers.map(center => new Center(center)))
      .catch(err => console.log(err));
  } else {
    return knex
      .select()
      .from("centers")
      .where({ id: parseInt(params.id) })
      .then(centers => centers.map(center => new Center(center)));
  }
};
