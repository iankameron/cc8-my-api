const validateMemberParams = name => {
  const validName =
    typeof name === "string" && name.replace(" ", "").length > 2;
  return validName;
};

module.exports = (knex, Member) => {
  return params => {
    const { patchId, newName } = params;
    if (!validateMemberParams(newName)) {
      return new Promise((resolve, reject) => {
        reject(new Error("invalid input"));
      });
    }
    // return knex("members").select();
    return knex("members")
      .returning("id")
      .update({ name: newName })
      .where({ id: parseInt(patchId) })
      .then(memberId => {
        return knex("members")
          .where({ id: parseInt(patchId) })
          .select();
      })
      .then(members => {
        console.log(members);
        return new Member(members.pop());
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
