const Center = function(dbCenter) {
  this.id = dbCenter.id;
  this.name = dbCenter.name;
  this.maxLanes = dbCenter.max_lanes;
  this.address = dbCenter.address;
};

Center.prototype.serialize = function() {
  // we use a serializer to format the object and
  // clean out any information that shouldn't be
  // sent to the client, like passwords, for example.
  return {
    id: this.id,
    name: this.name,
    maxLanes: this.maxLanes,
    address: this.address
  };
};

module.exports = knex => {
  return {
    Center,
    create: require("./create")(knex, Center),
    list: require("./list")(knex, Center)
    //get: require("./get")(knex, Center)
  };
};
