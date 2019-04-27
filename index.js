/**
 ********************************START SERVER********************************
 ****************************************************************************
 */

const config = require("./config.js");

const { services, server } = require("./server");

server.listen(config.express.port, () => {
  services.logger.log(`Server up and listening on port ${config.express.port}`);
});
