const knex = require("../db/connection");
const tableName = "reservations";

function list() {
  return knex(tableName).select("*");
}

function create(newReservation) {
  console.log(newReservation)
  return knex(tableName)
    .insert(newReservation)
    .returning("*")
    .then((newRecord) => newRecord[0]);
}

module.exports = {
  list,
  create,
};
