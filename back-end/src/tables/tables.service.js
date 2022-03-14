const knex = require("../db/connection");
const tableName = "tables";

function list() {
  return knex(tableName)
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