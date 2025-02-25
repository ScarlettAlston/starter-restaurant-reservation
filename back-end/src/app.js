const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { ORIGIN_HOST = "http://localhost:3000" } = process.env;
const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");
const tablesRouter = require("./tables/tables.router")

const app = express();

app.use(cors({ origin: ORIGIN_HOST }));
app.use(express.json());

app.use("/reservations", reservationsRouter);
app.use("/tables", tablesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
