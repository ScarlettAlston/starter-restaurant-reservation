import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import { ReservationForm } from "./ReservationForm";
import { createReservation } from "../utils/api";

const CreateReservation = () => {
  const [newReservation, setNewReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    people: 1,
    reservation_date: "",
    reservation_time: "",
  });
  const history = useHistory();

  async function handleSubmit(button) {
    if (button === "cancel") {
      history.goBack();
    } else {
      await createReservation(newReservation).then(() => {
        const destination = `/dashboard?date-${newReservation.reservation_date}`
        history.push(destination)
      })
    }
  }

  return (
    <div>
        <h2>Create Reservation</h2>
        <ReservationForm formData={newReservation} setFormData={setNewReservation} />
        <button
                type="button"
                className="btn btn-secondary mr-2"
                name="cancel"
                onClick={(event) => handleSubmit("done")}>
                Cancel
            </button>
    </div>
  );
};

export default CreateReservation;