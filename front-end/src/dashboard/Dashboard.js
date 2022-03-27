import React, { useEffect, useState } from "react";
import { listReservations, listTables, removeReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import { Link, useHistory, useLocation } from "react-router-dom";

function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const search = useLocation().search;
  const dateParam = new URLSearchParams(search).get("date");
  const history = useHistory()

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



  async function handleFinish(table_id) {
    const response = window.confirm(
      "Is this table ready to seat new guests?\nThis cannot be undone."
    )
    if (response) {
      await removeReservation(table_id);
      history.go(0)
    }
  }

  async function handleCancel(reservation_id) {
    const response = window.confirm(
      "Do you want to cancel this reservation?\nThis cannot be undone."
    )
    if (response) {
      await removeReservation(reservation_id);
      history.go(0)
    }
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
        <table className="mb table table-striped">
          <thead>
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Name</th>
              <th scope="col">Party Size</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Status</th>
              <th scope="col">Seat Party</th>
              <th scope="col"> </th>
              <th scope="col"> </th>
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
                  <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>

                  <td>
                    {reservation.status === "booked" &&
                      <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                        <button type="button" className="mx-1 btn btn-outline-secondary">
                          Seat
                        </button>
                      </Link>
                    }
                  </td>
                  <td>
                    <Link to={`/reservations/${reservation.reservation_id}/edit`}>
                      <button type="button" className="mx-1 btn btn-outline-secondary">
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleCancel(reservation.reservation_id)}
                      data-reservation-id-cancel={reservation.reservation_id}
                      type="button"
                      className="mx-1 btn btn-danger">
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br></br>
      <div>
        <h4> List of Tables </h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Table Name</th>
              <th scope="col">Capacity</th>
              <th scope="col">Availability</th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => {
              return (
                <tr key={table.table_id}>
                  <td>{table.table_name}</td>
                  <td>{table.capacity}</td>
                  {table.reservation_id &&
                    <td data-table-id-status={table.table_id}>Occupied</td>}
                  {!table.reservation_id &&
                    <td data-table-id-status={table.table_id}>Free</td>}
                  {table.reservation_id &&
                    <td>
                      <button
                        onClick={() => handleFinish(table.table_id)}
                        data-table-id-finish={table.table_id}
                        type="button"
                        className="btn btn-danger">
                        Finish
                      </button>
                    </td>}
                  {!table.reservation_id &&
                    <td data-table-id-status={table.table_id}> </td>}
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
