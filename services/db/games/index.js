const Game = function(dbGame) {
  this.id = dbGame.id;
  this.sessionId = dbGame.session_id;
  this.memberId = dbGame.member_id;
  this.scoreDetails = dbGame.score_details;
  this.finalScore = dbGame.final_score;
};

Game.prototype.serialize = function() {
  // we use a serializer to format the object and
  // clean out any information that shouldn't be
  // sent to the client, like passwords, for example.
  return {
    id: this.id,
    sessionId: this.sessionId,
    memberId: this.memberId,
    scoreDetails: this.scoreDetails,
    finalScore: this.finalScore
  };
};

module.exports = knex => {
  return {
    create: require("./create")(knex, Game),
    list: require("./list")(knex, Game)
    //patch: require("./patch")(knex, Game),
    //delete: require("./delete")(knex, Game)
    //get: require("./get")(knex, Game)
  };
};
