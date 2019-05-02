const express = require("express");
const router = express.Router();

module.exports = services => {
  router.post("", (req, res) => {
    const Game = req.body;
    services.db.games
      .create(Game)
      .then(game => res.status(201).json(game.serialize()))
      .catch(err => {
        res.status(400).send(err.message);
      });
  });

  // router.get("", (req, res) => {
  //   services.db.centers
  //     .list({ id: req.query.id })
  //     .then(centers => centers.map(center => center.serialize()))
  //     .then(centers => res.status(201).json(centers))
  //     .catch(err => res.status(400).send("Couldn't handle"));
  // });

  return router;
};
