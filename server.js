module.exports = env => {
  // takes in an "environment" string so the correct db can be used

  const config = require("./config.js")[env];

  const services = require("./services")(config);
  const apiRouter = require("./routes/api")(services);
  const morgan = require("morgan");
  const express = require("express");
  const bodyParser = require("body-parser"); // a middleware plugin to enable express to parse JSON
  const server = express();

  // 1. log every request when it comes in
  server.use(morgan("dev"));

  // 2. Set the headers for incoming requests
  server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,OPTIONS,PATCH"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, authorization"
    );
    next();
  });

  // 3. Parse request bodies as json
  server.use(bodyParser.json({ type: "application/json", limit: "50mb" }));

  // 4. If the requests begin with '/api', hand them off to the API router
  server.use("/api", apiRouter);
  server.use(express.static(`${__dirname}/public`)); // otherwise load the API about page

  // 5. Catch unhandled errors thrown by any of the previous middleware steps
  // eslint-disable-next-line no-unused-vars
  server.use((err, req, res, next) => {
    if (err.stack) {
      if (err.stack.match("node_modules/body-parser"))
        return res.status(400).send("Invalid JSON");
    }

    services.logger.log(err);
    return res.status(500).send("Internal Error.");
  });

  return { services, server };
};
