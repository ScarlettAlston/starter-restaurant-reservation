import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import ErrorAlert from "../layout/ErrorAlert"
import { listTables, getReservation, seatTable } from '../utils/api';


const SeatReservation = () => {
  const [reservation, setReservation] = useState({});
  const [tables, setTables] = useState([]);
  const [selectedValue, setSelectedValue] = useState({})
  const [error, setError] = useState(null);
  const reservation_id = useParams();
  const history = useHistory();

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

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const abortController = new AbortController();
      await seatTable(reservation_id, selectedValue, abortController.signal).then(() => {
        history.push("/dashboard")
      })
    } catch (error) {
      setError(error.message)
    }
  }

  function handleCancel() {
    history.goBack()
  }

  function changeHandler({ target }) {
    setSelectedValue(target.value)
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
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.first_name} {reservation.last_name}</td>
            <td>{reservation.people}</td>
            <td>{reservation.mobile_number}</td>
            <td>
              <select
                onChange={changeHandler}
                id="table_id" value={selectedValue}
                className="form-select"
                aria-label="Select Table">
                <option value="">Select Table</option>
                {tables.map((table) => {
                  return (
                    <option
                      key={table.table_id}
                      name="table_id"
                      value={table.table_id}>
                      {table.table_name} - {table.capacity}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button type="button" className="btn btn-danger" onClick={(event) => handleCancel(event)}>Cancel</button>
        <button type="button" className="btn btn-primary" onClick={(event) => handleSubmit(event)} >Submit</button>
      </div>
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