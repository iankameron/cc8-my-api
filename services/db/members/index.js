const Member = function(dbMember) {
  this.id = dbMember.id;
  this.name = dbMember.name;
  this.centerId = dbMember.center_id;
  this.skillLevel = dbMember.skill_level;
};

Member.prototype.serialize = function() {
  // we use a serializer to format the object and
  // clean out any information that shouldn't be
  // sent to the client, like passwords, for example.
  return {
    id: this.id,
    name: this.name,
    centerId: this.centerId,
    skillLevel: this.skillLevel
  };
};

module.exports = knex => {
  return {
    create: require("./create")(knex, Member),
    list: require("./list")(knex, Member),
    patch: require("./patch")(knex, Member)
    //get: require("./get")(knex, Member)
  };
};
