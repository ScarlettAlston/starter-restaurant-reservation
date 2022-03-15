const knex = require("../db/connection");
const tableName = "reservations";

function list(date) {
  return knex(tableName)
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
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
    .where({ reservation_id: updatedReservation.reservationId })
    .update(updatedReservation, "*")
}

module.exports = {
  list,
  update,
  create,
};
