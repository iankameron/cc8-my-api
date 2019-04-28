const express = require("express");

const router = express.Router();

const centerRouter = require("./center");
const memberRouter = require("./member");
// TODO: add games Routers

module.exports = services => {
  router.use("/centers", centerRouter(services));
  router.use("/members", memberRouter(services));

  return router;
};
