const express = require("express");
const router = express.Router();

module.exports = services => {
  router.post("", (req, res) => {
    const Session = req.body;
    console.log("IN API", Session);
    services.db.sessions
      .create(Session)
      .then(session => res.status(201).json(session.serialize()))
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
