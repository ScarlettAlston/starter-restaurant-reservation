const service = require("../tables/tables.service")
const serviceRes = require("../reservations/reservations.service")

function tableCapacity() {
  return async function (req, res, next) {
    try {
      const table = res.locals.table
      if (table.capacity >= res.locals.reservation.people) {
        next()
      } else {
        const name = table.table_name;
        const capacity = table.capacity
        const error = new Error(`Table ${name} has capacity of ${capacity}. Please choose another table.`)
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
        const error = new Error(`Table id: ${table.table_id} does not exist`)
        error.status = 404;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function reservationExists() {
  return async function (req, res, next) {
    try {
      const reservation = await serviceRes.getReservation(req.body.data.reservation_id)
      if (reservation) {
        res.locals.reservation = reservation;
        next()
      } else {
        const error = new Error(`reservation_id ${req.body.data.reservation_id} does not exist.`)
        error.status = 404
        throw error;
      }
    } catch (error) {
      next(error)
    }
  }
}

function isNumber() {
  return function (req, res, next) {
    try {
      if (typeof req.body.data.capacity === "number") {
        next();
      } else {
        const error = new Error("Input for capacity is not valid.");
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  };
}

function tableName() {
  return function (req, res, next) {
    try {
      if (req.body.data.table_name.length > 1) {
        next()
      } else {
        const error = new Error(`Input for 'table_name' must be more than 1 character`)
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error)
    }
  }
}

function removeResFromFreeTable() {
  return function (req, res, next) {
    try {
      if (res.locals.table.reservation_id != null) {
        next()
      } else {
        const error = new Error('Cannot remove reservation from unoccupied table')
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error)
    }
  }
}


module.exports = {
  tableCapacity,
  tableName,
  isNumber,
  tableExists,
  reservationExists,
  tableOccupied,
  tableExists,
}