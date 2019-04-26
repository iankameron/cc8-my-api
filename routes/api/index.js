const express = require("express");

const router = express.Router();

const centerRouter  = require("./center");
// TODO: add member, games Routers
// const channelRouter = require("./channel");

module.exports = (services) => {
  router.use("/centers", centerRouter(services));
  //router.use("/channels", channelRouter(services));

  return router;
};