const express = require("express");
const router = express.Router();
const sessionRouter = require("./session");

module.exports = services => {
  router.use("/sessions", sessionRouter(services));

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
      .list({ id: null }) // list all
      .then(centers => centers.map(center => center.serialize()))
      .then(centers => {
        res.status(201).json(centers);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send("Couldn't handle");
      });
  });

  router.get("/:id", (req, res) => {
    services.db.centers
      .list({ id: req.params.id })
      .then(centers => centers.map(center => center.serialize()))
      .then(centers => res.status(201).json(centers))
      .catch(err => res.status(400).send("Couldn't handle"));
  });

  return router;
};
