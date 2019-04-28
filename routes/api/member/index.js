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

  router.get("", (req, res) => {
    services.db.members
      .list({ id: req.query.id })
      .then(members => members.map(member => member.serialize()))
      .then(members => res.status(201).json(members))
      .catch(err => res.status(400).send("Couldn't handle"));
  });

  router.patch("/:id", (req, res) => {
    const patchId = req.params.id;
    const { newName } = req.body;
    services.db.members
      .patch({ patchId, newName })
      .then(member => res.status(201).json(member.serialize()))
      .catch(err => res.status(400).send("Couldn't handle"));
  });

  router.delete("/:id", (req, res) => {
    const deleteId = req.params.id;
    services.db.members
      .delete({ deleteId })
      .then(member => res.status(201).json(member.serialize()))
      .catch(err => res.status(400).send("Couldn't handle"));
  });

  return router;
};
