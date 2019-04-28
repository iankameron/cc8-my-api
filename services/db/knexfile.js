// Change database settings here

module.exports = {
  // PRODUCTION DATABASE
  prod: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      database: "bowling"
    },
    port: 5432,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./seeds/prod"
    }
  },
  // DEVELOPMENT DATABASE
  dev: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      database: "bowldev"
    },
    port: 5432,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
