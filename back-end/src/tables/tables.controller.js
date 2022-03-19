const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const hasProperties = require("../errors/hasProperties");
const { tableExists, reservationExists, tableOccupied, tableCapacity } = require("../middleware/tablesMiddleware")

async function list(req, res) {
  const data = await service.list()
  res.json({ data })
}

async function create(req, res) {
  const data = await service.create(req.body.data)
  res.status(201).json({ data });
}

async function update(req, res) {
  const data = res.locals.table;
  res.locals.table.reservation_id = res.locals.reservation.reservation_id;
  await service.update(res.locals.table);
  res.json({ data })
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [hasProperties("table_name", "capacity"), asyncErrorBoundary(create)],
  update: [
    hasProperties("table_name", "capacity", "reservation_id"),
    asyncErrorBoundary(tableExists()),
    asyncErrorBoundary(reservationExists()),
    isOccupied(),
    tableCapacity(),
    asyncErrorBoundary(update)
  ]
}