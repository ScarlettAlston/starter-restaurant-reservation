const knex = require("../db/connection");
const tableName = "reservations";

function list(){
  return knex(tableName).select("*")
}

function create(newReservation) {
  return knex(tableName).insert(newReservation).then((newRecord)=>newRecord[0])
}

module.exports = {
  list,
  create
}