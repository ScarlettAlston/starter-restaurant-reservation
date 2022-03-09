import React, { useState, useEffect} from "react";
import { ReservationForm } from "./ReservationForm"

const CreateReservation = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    people: 1,
    reservation_date: "",
    reservation_time: "",
  });

  return (
    <div>
        <h2>Create Reservation</h2>
        <ReservationForm formData={formData} setFormData={setFormData} />
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