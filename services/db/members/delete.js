module.exports = (knex, Member) => {
  return params => {
    const { deleteId } = params;
    console.log(deleteId);
    let deletedMembers;
    return knex("members")
      .select()
      .where({ id: parseInt(deleteId) })
      .then(members => {
        deletedMembers = members;
        console.log("1", deletedMembers);
        return knex("members")
          .where({ id: parseInt(deleteId) })
          .del();
      })
      .then(() => {
        console.log("2", deletedMembers);
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
