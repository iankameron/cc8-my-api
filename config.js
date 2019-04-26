module.exports = {
  db: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      database: "bowl",
    },
    port: 5432,
  },

  // port for server
  express: {
    port:3000
  },

  // timestamp format for logs
  logger: {
    format: "dddd MMMM Do YYYY, h:mm:ss a",
  },
}