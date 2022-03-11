import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ReservationForm } from "./ReservationForm";
import { createReservation } from "../utils/api";

const CreateReservation = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    people: 1,
    reservation_date: "",
    reservation_time: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await createReservation(formData).then(() => {
        const destination = `/dashboard?date=${formData.reservation_date}`;
        history.push(destination);
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <h2>Create Reservation</h2>
      {errorMessage && (
        <h5 className="alert alert-danger mx-1">{errorMessage}</h5>
      )}
      <ReservationForm formData={formData} setFormData={setFormData} />
      <button
        type="button"
        className="btn btn-secondary mr-2"
        name="cancel"
        onClick={(event) => handleCancel()}
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
  );
};

export default CreateReservation;
