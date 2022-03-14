import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import { Link, useLocation } from "react-router-dom";

function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const search = useLocation().search;
  const dateParam = new URLSearchParams(search).get("date");

  let date;

  dateParam ? (date = dateParam) : (date = today());

  const previousDate = previous(date);
  const nextDate = next(date);


  useEffect(() => loadDashboard(date), [date]);

  function loadDashboard(date) {
    const abortController = new AbortController();
    setError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex flex-column">
        <h4>Reservations for date</h4>
        <div className="btn-group my-1 justify-content-between">
          <Link to={`/dashboard?date=${previousDate}`}>
            <button type="button" className="mx-1 btn btn-outline-secondary">
              Prev
            </button>
          </Link>
          <Link to={"/dashboard"}>
            <button className="mx-1 btn btn-primary">Today</button>
          </Link>
          <Link to={`/dashboard?date=${nextDate}`}>
            <button type="button" className="mx-1 btn btn-outline-secondary">
              Next
            </button>{" "}
          </Link>
        </div>
      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Name</th>
              <th scope="col">Party Size</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Seat Party</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => {
              return (
                <tr key={reservation.reservation_id}>
                  <td>{reservation.reservation_time}</td>
                  <td>
                    {reservation.first_name} {reservation.last_name}
                  </td>
                  <td>{reservation.people}</td>
                  <td>{reservation.mobile_number}</td>
                  <td>
                    <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                      <button type="button" className="mx-1 btn btn-outline-secondary">
                        Seat
                      </button>{" "}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <th>Table Name</th>
            <th>Capacity</th>
          </thead>
          <tbody>
            {tables.map((table) => {
              return (
                <tr key={table.table_id}>
                  <td>{table.table.name}</td>
                  <td>{table.capacity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ErrorAlert error={error} />
    </main>
  );
}

export default Dashboard;
