const express = require("express");
const router = express.Router();

module.exports = services => {
  router.post("", (req, res) => {
    const Member = req.body;
    services.db.members
      .create(Member)
      .then(member => res.status(201).json(member.serialize()))
      .catch(err => {
        console.log(err);
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
