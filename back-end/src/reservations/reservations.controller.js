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
} = require("../errors/dateValidation");

async function list(req, res) {
  const { date } = req.query;
  res.json({ data: await service.list(date) });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const data = await service.update(req.body.data)
  res.json({ data })
}

module.exports = {
  list,
  update,
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
