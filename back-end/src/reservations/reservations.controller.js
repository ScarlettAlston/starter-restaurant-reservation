const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const {
  isDate,
  statusIsValid,
  reservationExists,
  reservationIsBooked,
  validateTime,
  resTimeValid,
  dateObjects,
  isNumber,
  isTuesday,
  resStatusFinished,
  isFuture,
} = require("../middleware/reservationsMiddleware");

async function list(req, res) {
  const { date, mobile_number } = req.query;
  if (mobile_number) {
    return res.json({ data: await service.SearchReservation(mobile_number) })
  } else {
    return res.json({ data: await service.list(date, mobile_number) });
  }
}

function getReservation(req, res) {
  const data = res.locals.reservation
  return res.status(200).json({ data })
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  return res.status(201).json({ data });
}

async function update(req, res) {
  const data = await service.update(req.body.data)
  return res.json({ data })
}

async function updateStatus(req, res) {
  const updatedReservation = res.locals.reservation
  updatedReservation.status = req.body.data.status
  const data = await service.update(updatedReservation)
  return res.status(200).json({ data })
}

module.exports = {
  list,
  update: [
    reservationExists(),
    hasProperties(
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "people"
    ),
    isDate(),
    validateTime(),
    dateObjects(),
    isNumber(),
    isTuesday(),
    isFuture(),
    resTimeValid(),
    statusIsValid(),
    resStatusFinished(),
    asyncErrorBoundary(update)],
  getReservation: [
    asyncErrorBoundary(reservationExists()),
    getReservation
  ],
  updateStatus: [
    reservationExists(),
    statusIsValid(),
    resStatusFinished(),
    asyncErrorBoundary(updateStatus)
  ],
  create: [
    hasProperties(
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "people"
    ),
    isDate(),
    validateTime(),
    dateObjects(),
    isNumber(),
    isTuesday(),
    isFuture(),
    resTimeValid(),
    reservationIsBooked(),
    asyncErrorBoundary(create),
  ],
};
