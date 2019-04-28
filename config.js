const Port = { port: 3000 };
const Logger = { format: "dddd MMMM Do YYYY, h:mm:ss a" };

module.exports = {
  dev: {
    db: {
      client: "pg",
      connection: {
        host: "127.0.0.1",
        /////// BOWLING DEVELOPMENT DB
        database: "bowldev"
      },
      port: 5432
    },
    express: Port,
    logger: Logger
  },
  prod: {
    db: {
      client: "pg",
      connection: {
        host: "127.0.0.1",
        /////// BOWLING PRODUCTION DB
        database: "bowling"
      },
      port: 5432
    },
    express: Port,
    logger: Logger
  }
};
