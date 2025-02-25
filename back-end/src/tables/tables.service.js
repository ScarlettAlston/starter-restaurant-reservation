const knex = require("../db/connection");
const tableName = "tables";

function list() {
  return knex(tableName)
    .orderBy("table_name")
    .select("*")
}

function read(table_id) {
  return knex(tableName)
    .select("*")
    .where({ table_id })
    .first()

}

function create(newTable) {
  return knex(tableName)
    .insert(newTable)
    .returning("*")
    .then((newRecord) => newRecord[0])
}

function update(updatedTable) {
  return knex(tableName)
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*")
}




module.exports = {
  list,
  read,
  create,
  update
}