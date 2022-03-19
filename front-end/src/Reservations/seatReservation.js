import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorAlert from "../layout/ErrorAlert"
import { listTables, getReservation } from '../utils/api';


const SeatReservation = () => {
  const [reservation, setReservation] = useState({});
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const reservation_id = useParams();

  useEffect(() => loadTables(reservation_id), [reservation_id])

  function loadTables({ reservation_id }) {
    const abortController = new AbortController()
    setError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setError)
    getReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setError)
    return () => abortController.abort()
  }



  return (
    <div>
      <h1>Seat Reservation</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Name</th>
            <th scope="col">Party Size</th>
            <th scope="col">Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.first_name} {reservation.last_name}</td>
            <td>{reservation.people}</td>
            <td>{reservation.mobile_number}</td>
          </tr>
        </tbody>
      </table>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Table Number</th>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => {
            return (
              <tr key={table.table_id}>
                <td>{table.table_id}</td>
                <td>{table.table_name}</td>
                <td>{table.capacity}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <ErrorAlert error={error} />
      </div>
    </div>
  )
}

export default SeatReservation