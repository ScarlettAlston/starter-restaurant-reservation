const knex = require("../db/connection");
const tableName = "reservations";

function list(date) {
  return knex(tableName)
    .select("*")
    .where({ reservation_date: date })
    .whereNotIn('status', ['finished', 'cancelled'])
    .orderBy("reservation_time");
}

function SearchReservation(mobile_number) {
  return knex(tableName)
    .select("*")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_time")
}

function getReservation(reservation_id) {
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
    .then(newRecord => newRecord[0])
}

module.exports = {
  list,
  SearchReservation,
  getReservation,
  update,
  create,
};
