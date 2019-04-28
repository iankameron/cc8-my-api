// Create Member in DB

const validateMemberParams = (name, centerId, skillLevel) => {
  const validName =
    typeof name === "string" && name.replace(" ", "").length > 2;
  const validCenterId = parseInt(centerId) === centerId;
  const validSkillLevel = parseInt(skillLevel) === skillLevel;
  return validName && validCenterId && validSkillLevel;
};

module.exports = (knex, Member) => {
  return params => {
    const { name, centerId, skillLevel } = params;
    if (!validateMemberParams(name, centerId, skillLevel)) {
      return new Promise((resolve, reject) => {
        reject(new Error("invalid input"));
      });
    }

    // return knex("members").select();
    return knex
      .table("members")
      .returning("id")
      .insert({
        name: name,
        center_id: parseInt(centerId),
        skill_level: parseInt(skillLevel)
      })
      .orderBy("id")
      .then(memberId => {
        return knex("members")
          .where({ id: parseInt(memberId) })
          .select();
      })
      .then(members => new Member(members.pop()))
      .catch(err => {
        console.log(err);
        // known errors
        if (err.message.match("duplicate key value"))
          throw new Error("Duplicate in database");

        // unknown errors
        throw err;
      });
  };
};
