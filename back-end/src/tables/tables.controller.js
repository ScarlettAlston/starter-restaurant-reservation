const { restart } = require("nodemon");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const hasProperties = require("../errors/hasProperties")


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