const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

function list(req, res) {
  console.log("CONTROLLER")
  const data = service.list()
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