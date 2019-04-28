// *******   START SERVER   *************

// NAME OF DATABASE ENVIRONMENT TO CONNECT TO
const env = "prod";

// get config for the appropriate database
const config = require("./config.js")[env];

// get server for the appropriate database
const { services, server } = require("./server")(env);

// start listening
server.listen(config.express.port, () => {
  services.logger.log(`Server up and listening on port ${config.express.port}`);
});
