const knex = require("../db/connection");
const tableName = "tables";

function list() {
  console.log("SERVICE")
  return knex(tableName)
    .orderBy("table_name")
    .select("*")
}

function create(newTable) {
  return knex(tableName)
    .insert(newTable)
    .returning("*")
    .then((newRecord) => newRecord[0])
}

module.exports = {
  list,
  create
}