const config = require("../config");
const knex = require("knex")(config.db);

const ignoreError = () => {
  // ignore
};

const clearTable = tableName =>
  knex(tableName)
    .truncate()
    .then(() => tableName)
    .catch(ignoreError);

const tables = ["centers"];

Promise.all(tables.map(clearTable)).then(clearedTables => {
  for (let clearedTable in clearedTables) {
    console.log(`PRETEST DB CLEANING DONE: "${clearedTables}"`);
  }
  process.exit();
});
