const express = require("express");
const router = express.Router();

module.exports = services => {
  router.post("", (req, res) => {
    const Center = req.body;
    services.db.centers
      .create(Center)
      .then(center => {
        res.status(201).json(center.serialize);
      })
      .catch(err => {
        res.status(400).send(err.message);
      });
  });

  return router;
};
