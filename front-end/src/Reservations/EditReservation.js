import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { getReservation, updateReservation } from '../utils/api';
import { ReservationForm } from './ReservationForm'

const EditReservation = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    people: 1,
    reservation_date: "",
    reservation_time: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const { reservation_id } = useParams()


  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const parsedData = { ...formData, people: Number(formData.people) }
      await updateReservation(parsedData).then(() => {
        history.goBack();
      })
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleCancel() {
    history.goBack();
  }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => loadReservation(), [reservation_id])

  async function loadReservation() {
    const abortController = new AbortController();
    try {
      const abortController = new AbortController();
      setErrorMessage(null);
      let reservation = await getReservation(reservation_id, abortController.signal)
      reservation.reservation_date = reservation.reservation_date.slice(0, 10)
      setFormData(reservation)
    } catch (error) {
      setErrorMessage(error);
    }
    return () => abortController.abort();
  }

  return (
    <div>
      <h2>Edit Reservation</h2>
      <ReservationForm formData={formData} setFormData={setFormData} />
      {errorMessage && (
        <h5 className="alert alert-danger mx-1">{errorMessage}</h5>
      )}
      <button
        type="button"
        className="btn btn-secondary mr-2"
        name="cancel"
        onClick={(event) => handleCancel(event)}
      >
        Cancel
      </button>

      <button
        type="submit"
        className="btn btn-primary mr-2"
        name="submit"
        onClick={(event) => handleSubmit(event)}
      >
        Submit
      </button>

    </div>
  )
}

export default EditReservation