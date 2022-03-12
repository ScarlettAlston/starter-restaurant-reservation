function isDate() {
  return function (req, res, next) {
    try {
      if (Date.parse(req.body.data.reservation_date)) {
        next();
      } else {
        const error = new Error(
          `Field: "reservation_date" is not a valid date`
        );
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  };
}

function isFuture() {
  return function (req, res, next) {
    try {
      if (res.locals.submitDate >= res.locals.todaysDate) {
        next();
      } else {
        const error = new Error(
          `The reservation must be in the future. We cannot time travel.`
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
        const error = new Error(`Field: "people" is not a valid number`);
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
        const error = new Error("The reservation_time is not valid");
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
        const error = new Error("Sorry! We're closed that day.");
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
      if () {

      } else {
        const error = new Error("Sorry! We cannot create a reservation at this time.");
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

module.exports = {
  dateObjects,
  isDate,
  isFuture,
  isNumber,
  validateTime,
  isTuesday,
};
