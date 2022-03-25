const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const resService = require("../reservations/reservations.service")
const hasProperties = require("../errors/hasProperties");
const { tableExists, reservationExists, tableOccupied, tableCapacity, isNumber, tableName, removeResFromFreeTable, tableIsSeated, } = require("../middleware/tablesMiddleware");
const { reservationIsSeated } = require("../middleware/reservationsMiddleware");

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

async function seatTable(req, res) {
  res.locals.table.reservation_id = res.locals.reservation.reservation_id;
  res.locals.reservation.status = "seated";
  const data = await service.update(res.locals.table);
  res.json({ data });

  const resData = await resService.update(res.locals.reservation);
  res.json({ resData });
}

async function removeReservation(req, res) {
  const data = res.locals.table;
  res.locals.table.reservation_id = null;
  await service.update(res.locals.table);
  res.json({ data })
}


module.exports = {
  list: [asyncErrorBoundary(list)],
  read,
  create: [
    hasProperties("table_name", "capacity"),
    tableName(),
    isNumber(),
    reservationIsSeated(),
    asyncErrorBoundary(create)
  ],
  seatTable: [
    hasProperties("reservation_id"),
    asyncErrorBoundary(tableExists()),
    asyncErrorBoundary(reservationExists()),
    tableOccupied(),
    tableCapacity(),
    asyncErrorBoundary(seatTable)
  ],
  removeReservation: [
    asyncErrorBoundary(tableExists()),
    removeResFromFreeTable(),
    asyncErrorBoundary(removeReservation),
  ]
}