const express = require("express");
const router = express.Router();

module.exports = services => {
  router.post("", (req, res) => {
    const Center = req.body;
    services.db.centers
      .create(Center)
      .then(center => res.status(201).json(center.serialize()))
      .catch(err => {
        res.status(400).send(err.message);
      });
  });

  router.get("", (req, res) => {
    services.db.centers
      .list()
      .then(centers => centers.map(center => center.serialize()))
      .then(centers => res.status(201).json(centers))
      .catch(err => res.status(400).send("Couldn't handle"));
  });

  return router;
};
