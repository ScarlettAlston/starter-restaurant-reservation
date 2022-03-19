const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const {
  isDate,
  validateTime,
  resTimeValid,
  dateObjects,
  isNumber,
  isTuesday,
  isFuture,
} = require("../middleware/reservationsMiddleware");

async function list(req, res) {
  const { date } = req.query;
  res.json({ data: await service.list(date) });
}

async function getReservation(req, res) {
  const { reservation_id } = req.params
  const data = await service.getReservation(reservation_id)
  res.status(200).json({ data })
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const { reservation_id } = req.params
  const data = await service.update(reservation_id, req.body.data)
  res.json({ data })
}

module.exports = {
  list,
  update,
  getReservation,
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
    asyncErrorBoundary(create),
  ],
};
