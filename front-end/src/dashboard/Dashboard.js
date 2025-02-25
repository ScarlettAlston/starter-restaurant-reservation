import "./dashboard.css";
import React, { useEffect, useState } from "react";
import { listReservations, listTables, removeReservationFromTable, updateStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import { Link, useHistory, useLocation } from "react-router-dom";


function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [update, setUpdate] = useState(0);
  const [error, setError] = useState(null);
  const search = useLocation().search;
  const dateParam = new URLSearchParams(search).get("date");
  const history = useHistory()

  let date;

  dateParam ? (date = dateParam) : (date = today());

  const previousDate = previous(date);
  const nextDate = next(date);


  useEffect(() => loadDashboard(date), [date, update]);

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
      await removeReservationFromTable(table_id);
      history.go(0)
    }
  }

  async function handleCancel(reservation_id) {
    const abortController = new AbortController();
    const response = window.confirm(
      "Do you want to cancel this reservation?\nThis cannot be undone."
    )
    if (response) {
      await updateStatus("cancelled", reservation_id, abortController.signal);
      setUpdate(update + 1)
    }
    return () => abortController.abort();
  }

  return (
    <main>
      <h1 className="m-4">Dashboard</h1>
      <br />
      <div className="d-md-flex flex-column">
        <div className="btn-group justify-content-between mx-4">
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
        <div className="container-fluid">
          <div className="col">
            <table className="mb table table-striped">
              <caption><h4>Reservations for {date}</h4></caption>
              <thead className="text-center">
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
              <tbody className="text-center">
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
                            <button type="button" className="mx-1 my-1 ml-4 btn btn-sm btn-outline-secondary">
                              Seat
                            </button>
                          </Link>
                        }
                      </td>
                      <td>
                        <Link to={`/reservations/${reservation.reservation_id}/edit`}>
                          <button type="button" className="mx-1 my-1 btn btn-sm btn-outline-secondary">
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => handleCancel(reservation.reservation_id)}
                          data-reservation-id-cancel={reservation.reservation_id}
                          type="button"
                          className="mx-1 my-1 btn btn-sm btn-danger">
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br />
            <table className="table table-striped">
              <caption><h4> List of Tables</h4></caption>
              <thead className="text-center">
                <tr>
                  <th scope="col">Table Name</th>
                  <th scope="col">Capacity</th>
                  <th scope="col">Availability</th>
                  <th scope="col"> </th>
                </tr>
              </thead>
              <tbody className="text-center">
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
                            className="btn btn-sm btn-danger">
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
        </div>
      </div>
      <ErrorAlert error={error} />
    </main>
  );
}

export default Dashboard;
