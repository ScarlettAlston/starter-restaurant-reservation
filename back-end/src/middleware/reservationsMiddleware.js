function isDate() {
  return function (req, res, next) {
    try {
      if (Date.parse(req.body.data.reservation_date)) {
        next();
      } else {
        const error = new Error(
          "Field: 'reservation_date' is not a valid date"
        );
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  };
}

function reservationIsSeated() {
  return function (req, res, next) {
    try {
      if (res.locals.reservation.status === "booked") {
        next()
      } else {
        const error = new Error("This reservation's status is seated")
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error)
    }
  }
}

function isFuture() {
  return function (req, res, next) {
    try {
      if (res.locals.submitDate >= res.locals.todaysDate) {
        next();
      } else {
        const error = new Error(
          `The reservation must be for a future time.`
        );
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  };
}

function isNumber() {
  return function (req, res, next) {
    try {
      if (typeof req.body.data.people === "number") {
        next();
      } else {
        const error = new Error("Field: 'people' or 'party size' is not valid");
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  };
}

function validateTime() {
  return function (req, res, next) {
    const isValid = /[0-9]{2}:[0-9]{2}/.test(req.body.data.reservation_time);
    try {
      if (isValid) {
        next();
      } else {
        const error = new Error("Field: reservation_time is not valid");
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  };
}

function isTuesday() {
  return function (req, res, next) {
    try {
      if (res.locals.submitDate.getDay() != 2) {
        next();
      } else {
        const error = new Error("Restaurant is closed.");
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  };
}

function resTimeValid() {
  return function (req, res, next) {
    try {

      if (req.body.data.reservation_time >= "10:30" && req.body.data.reservation_time <= "21:30") {
        next()
      } else {
        const error = new Error("Cannot create a reservation at this time.");
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function dateObjects() {
  return function (req, res, next) {
    res.locals.submitDate = new Date(req.body.data.reservation_date + " " + req.body.data.reservation_time);
    res.locals.todaysDate = new Date();
    next();
  };
}

function reservationExists() {
  return async function (req, res, next) {
    try {
      const reservation = await service.getReservation(req.params.reservation_id);
      if (reservation) {
        res.locals.reservation = reservation;
        next();
        console.log(res.locals.reservation)
      } else {
        const error = new Error('Reservation does not exist.');
        error.status = 404;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  reservationIsSeated,
  reservationExists,
  resTimeValid,
  dateObjects,
  isDate,
  isFuture,
  isNumber,
  validateTime,
  isTuesday,
};
