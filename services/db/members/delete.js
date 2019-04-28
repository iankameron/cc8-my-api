module.exports = (knex, Member) => {
  return params => {
    const { deleteId } = params;
    let deletedMembers;
    return knex("members")
      .select()
      .where({ id: parseInt(deleteId) })
      .then(members => {
        deletedMembers = members;
        return knex("members")
          .where({ id: parseInt(deleteId) })
          .del();
      })
      .then(() => {
        return new Member(deletedMembers.pop());
      })
      .catch(err => {
        console.log(err);
        // known errors
        if (err.message.match("duplicate key value"))
          throw new Error("That username already exists");

        // unknown errors
        throw err;
      });
  };
};
