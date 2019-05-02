const config = require("../config")["dev"];
const knex = require("knex")(config.db);

const ignoreError = err => {
  console.log(err);
};

const clearTable = tableName =>
  knex(tableName)
    .del()
    .then(() => knex.raw(`alter sequence ${tableName}_id_seq restart`))
    .then(() => tableName)
    .catch(ignoreError);

const tables = ["games", "sessions", "members", "centers"];

Promise.all(tables.map(clearTable)).then(clearedTables => {
  for (let clearedTable of clearedTables) {
    console.log(`PRETEST DB CLEANING DONE: "${clearedTable}"`);
  }
  process.exit();
});
