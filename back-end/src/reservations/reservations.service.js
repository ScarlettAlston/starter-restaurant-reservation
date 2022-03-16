const knex = require("../db/connection");
const tableName = "reservations";

function list(date) {
  return knex(tableName)
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function read(reservation_id) {
  return knex(tableName)
    .select("*")
    .where({ reservation_id })
    .first()
}

function create(newReservation) {
  return knex(tableName)
    .insert(newReservation)
    .returning("*")
    .then((newRecord) => newRecord[0]);
}

function update(updatedReservation) {
  return knex(tableName)
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
}

module.exports = {
  list,
  read,
  update,
  create,
};
