const knex = require("../db/connection");
const tableName = "tables";

function list() {
  return knex(tableName)
    .selectt("*")
}

function create(newTable) {
  return knex(tableName)
    .insert(newTable)
    .returning("*")
    .then((newRecord) => newRecord[0])
}