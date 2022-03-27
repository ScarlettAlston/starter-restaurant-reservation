import React, { useState } from 'react'
import { listReservations } from '../utils/api';

const SearchReservation = () => {
  const [formData, setFormData] = useState({ mobile_number: "" })
  const [reservations, setReservations] = useState()
  const [errorMessage, setErrorMessage] = useState("");




  async function handleFind(event) {
    const abortController = new AbortController();
    event.preventDefault()
    try {
      setErrorMessage(null)
      if (formData.mobile_number.length < 1) {
        return setErrorMessage("You must enter at least one digit")
      }
      const { mobile_number } = formData;
      const data = await listReservations(
        { mobile_number },
        abortController.signal
      );
      setReservations([...data]);
    } catch (error) {
      setErrorMessage(error);
    }
    return () => abortController.abort();
  }

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value })
  }

  return (
    <div>
      <h2> Search </h2>
      {errorMessage && (
        <h5 className="alert alert-danger mx-1">{errorMessage}</h5>
      )}
      <label htmlFor="search_for_reservation" className="mt-2"> <strong>Search For A Reservation</strong></label>
      <div className="row g-3">
        <div className="d-flex col-md-6">
          <input
            value={formData.mobile_number}
            type="string"
            name="mobile_number"
            className="mr-0 form-control"
            placeholder="Enter a customer's phone number"
            aria-label="Reservation phone number"
            required
            onChange={handleChange}
          />
          <button
            className="ml-0 btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
            onClick={(event) => handleFind(event)}>
            Find
          </button>
        </div>
      </div>
      {(reservations &&
        <div>
          <table className="mb table table-striped">
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Name</th>
                <th scope="col">Party Size</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Status</th>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>)}
      {Array.isArray(reservations) && reservations.length === 0 && <h4>No reservations found</h4>}
    </div>
  )
}

export default SearchReservation