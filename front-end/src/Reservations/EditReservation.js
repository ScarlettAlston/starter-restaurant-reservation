import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { getReservation, createReservation } from '../utils/api';
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
      await createReservation(parsedData).then(() => {
        const destination = `/reservations/${reservation_id}/edit`;
        history.push(destination);
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleCancel() {
    history.goBack();
  }


  useEffect(loadReservation, [reservation_id])

  function loadReservation() {
    const abortController = new AbortController();
    setErrorMessage(null);
    getReservation(reservation_id, abortController.signal)
      .then(setFormData)
      .catch(setErrorMessage);
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