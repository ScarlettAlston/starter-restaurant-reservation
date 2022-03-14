const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

async function list(req, res) {
  console.log("CONTROLLER")
  const data = await service.list()
  res.json({ data })
}

async function create(req, res) {
  const data = await service.create(req.body.data)
  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(create)
  ]
}