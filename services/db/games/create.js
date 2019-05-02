// Create Game in DB

const validateGameParams = (sessionId, memberId, scoreDetails, finalScore) => {
  const validSessionId = parseInt(sessionId) === sessionId;
  const validMemberId = parseInt(memberId) === memberId;
  const validScoreDetails = typeof scoreDetails === "string";
  const validFinalScore = parseInt(finalScore) === finalScore;
  return (
    validSessionId && validMemberId && validScoreDetails && validFinalScore
  );
};

module.exports = (knex, Game) => {
  return params => {
    const { sessionId, memberId, scoreDetails, finalScore } = params;
    if (!validateGameParams(sessionId, memberId, scoreDetails, finalScore)) {
      return new Promise((resolve, reject) => {
        reject(new Error("invalid input"));
      });
    }

    return knex
      .table("games")
      .returning("id")
      .insert({
        session_id: parseInt(sessionId),
        member_id: parseInt(memberId),
        score_details: scoreDetails,
        final_score: finalScore
      })
      .then(gameId => {
        return knex("games")
          .where({ id: parseInt(gameId) })
          .select();
      })
      .then(games => new Game(games.pop()))
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
