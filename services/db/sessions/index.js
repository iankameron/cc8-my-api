const Session = function(dbSession) {
  this.id = dbSession.id;
  this.centerId = dbSession.center_id;
  this.startTime = dbSession.start_time;
};

Session.prototype.serialize = function() {
  // we use a serializer to format the object and
  // clean out any information that shouldn't be
  // sent to the client, like passwords, for example.
  return {
    id: this.id,
    centerId: this.centerId,
    startTime: this.startTime
  };
};

module.exports = knex => {
  return {
    create: require("./create")(knex, Session)
    //list: require("./list")(knex, Member),
    //patch: require("./patch")(knex, Member),
    //delete: require("./delete")(knex, Member)
    //get: require("./get")(knex, Member)
  };
};
