const { restart } = require("nodemon");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const hasProperties = require("../errors/hasProperties");
const { listTables, updateTables } = require("../../../front-end/src/utils/api");
const { table } = require("../db/connection");

function tableCapacity() {
  return function (req, res, next) {
    try {
      const table = req.body.data
      if (table.reservation_id === null) {
        next()
      }
      res.locals.reservation = await service.getReservation(table.reservation_id);
      if (table.capacity >= res.locals.reservation.people) {
        next()
      } else {
        const table = table.table_name;
        const tableCapacity = table.capacity
        const error = new Error(`Table ${tableName} has capacity of ${tableCapacity}. Please choose another table.`)
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error)
    }
  }
}

async function list(req, res) {
  const data = await service.list()
  res.json({ data })
}

async function create(req, res) {
  const data = await service.create(req.body.data)
  res.status(201).json({ data });
}

async function update(req, res) {
  const { table_id } = req.params;
  const data = await service.create(table_id, req.body.data)
  res.jason({ data })
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(create)
  ],
  update: [asyncErrorBoundary(update)]
}