module.exports = (knex, Member) => params => {
  if (params.id === undefined) {
    return knex
      .select()
      .from("members")
      .orderBy("id")
      .then(members => members.map(member => new Member(member)));
  } else {
    return knex
      .select()
      .from("members")
      .where({ id: parseInt(params.id) })
      .then(members => members.map(member => new Member(member)));
  }
};
