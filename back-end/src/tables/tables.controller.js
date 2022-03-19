const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const hasProperties = require("../errors/hasProperties");
const { tableExists, reservationExists, tableOccupied, tableCapacity, isNumber, tableName } = require("../middleware/tablesMiddleware")

async function list(req, res) {
  const data = await service.list()
  res.json({ data })
}

async function read(req, res) {
  const { table_id } = req.params
  const data = await service.read(table_id)
  res.json({ data });
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
  read,
  create: [hasProperties("table_name", "capacity"), tableName(), isNumber(), asyncErrorBoundary(create)],
  update: [
    hasProperties("reservation_id"),
    asyncErrorBoundary(tableExists()),
    asyncErrorBoundary(reservationExists()),
    tableOccupied(),
    tableCapacity(),
    tableName(),
    isNumber(),
    asyncErrorBoundary(update)
  ]
}