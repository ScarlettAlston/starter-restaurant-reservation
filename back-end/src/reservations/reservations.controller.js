const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service")

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({data: await service.list()});
}

async function create(req, res) {
  res.json({data: await service.create(req.body.data)})
}

module.exports = {
  list,
  create: asyncErrorBoundary(create),
};
