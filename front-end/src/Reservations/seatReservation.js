import React, { useEffect, useState } from 'react'
import { listTables } from '../utils/api';

const SeatReservation = () => {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null)

  let capacity;

  useEffect(() => loadTables(capacity), [capacity])

  function loadTables(capacity) {
    const abortController = new AbortController()
    setError(null);
    listTables({ capacity }, abortController.signal)
      .then(setTables)
      .catch(setError)
  }



  return (
    <div>
      <h1>Seat Reservation</h1>
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
    </div>
  )
}

export default SeatReservation