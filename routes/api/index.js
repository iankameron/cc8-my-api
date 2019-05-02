const express = require("express");

const router = express.Router();

const centerRouter = require("./center");
const memberRouter = require("./member");
const gameRouter = require("./game");
// TODO: add games Routers

module.exports = services => {
  router.use("/centers", centerRouter(services));
  router.use("/members", memberRouter(services));
  router.use("/games", gameRouter(services));

  return router;
};
