function tableCapacity() {
  return async function (req, res, next) {
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

function tableOccupied() {
  return function (req, res, next) {
    try {
      if (!res.locals.table.reservation_id) {
        next()
      } else {
        const error = new Error(`${res.locals.table.table_id} is occupied!`)
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error)
    }
  }
}

function tableExists() {
  return async function (req, res, next) {
    try {
      const table = await service.read(req.params.table_id);
      if (table) {
        res.locals.table = table;
        next();
      } else {
        const error = new Error(`Table id: ${table_id} does not exists`)
        error.status = 404;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function reservationExists() {
  return function (req, res, next) {
    try {
      if (!req.body.data.reservation_id) {
        next()
      } else {

      }
    } catch (error) {
      next(error)
    }
  }
}


module.exports = {
  tableCapacity,
  tableExists,
  reservationExists,
  tableOccupied,
  tableExists,
}