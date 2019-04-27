const express = require("express");
const router = express.Router();

module.exports = (services) => {

  router.get("", (req, res) => {
    console.log("gettingin");
    res.json({center: "this is a list of centers."});
  });

  return router;
}