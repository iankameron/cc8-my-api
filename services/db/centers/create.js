// Create Center in DB

const validateCenterParams = (name, maxLanes, address) => {
  const validName =
    typeof name === "string" && name.replace(" ", "").length > 2;
  const validMaxNames = parseInt(maxLanes) === maxLanes;
  const validAddress =
    typeof address === "string" && address.replace(" ", "").length > 2;
  return validName && validMaxNames && validAddress;
};

module.exports = (knex, Center) => {
  return params => {
    const { name, maxLanes, address } = params;
    if (!validateCenterParams(name, maxLanes, address)) {
      return new Promise((resolve, reject) => {
        reject(new Error("invalid input"));
      });
    }

    return knex("centers")
      .returning("id")
      .insert({ name: name, max_lanes: maxLanes, address: address })
      .then(centerId => {
        return knex("centers")
          .where({ id: parseInt(centerId) })
          .select();
      })
      .then(centers => new Center(centers.pop()))
      .catch(err => {
        // known errors
        if (err.message.match("duplicate key value"))
          throw new Error("That username already exists");

        // unknown errors
        throw err;
      });
  };
};
