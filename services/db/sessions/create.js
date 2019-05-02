// Create Session in DB

const validateSessionParams = centerId => {
  const validCenterId = parseInt(centerId) === centerId;
  return validCenterId;
};

module.exports = (knex, Session) => {
  return params => {
    const { centerId } = params;
    console.log("IN DB FUNCTITON", centerId);

    if (!validateSessionParams(parseInt(centerId))) {
      return new Promise((resolve, reject) => {
        reject(new Error("invalid input"));
      });
    }

    return knex
      .table("sessions")
      .returning("id")
      .insert({
        center_id: parseInt(centerId)
      })
      .then(sessionId => {
        return knex("sessions")
          .where({ id: parseInt(sessionId) })
          .select();
      })
      .then(sessions => new Session(sessions.pop()))
      .catch(err => {
        console.log(err);
        // known errors
        // if (err.message.match("duplicate key value"))
        //   throw new Error("Duplicate in database");

        // unknown errors
        throw err;
      });
  };
};
