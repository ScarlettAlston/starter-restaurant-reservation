import React from "react";

export const ReservationForm = ({ formData, setFormData }) => {
  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  return (
    <form>
      <div className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input
          type="string"
          className="form-control m-1"
          name="first_name"
          onChange={handleChange}
          value={formData.first_name}
        />
        <label htmlFor="last_name">Last Name</label>
        <input
          type="string"
          className="form-control m-1"
          name="last_name"
          onChange={handleChange}
          value={formData.last_name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobile_number">Mobile Number:</label>
        <input
          type="string"
          className="form-control m-1"
          name="mobile_number"
          onChange={handleChange}
          value={formData.mobile_number}
        />
        <label htmlFor="people">Party Size:</label>
        <input
          type="integer"
          className="form-control m-1"
          name="people"
          onChange={handleChange}
          value={formData.people}
        />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_date">Reservation Date:</label>
        <input
          name="reservation_date"
          type="date"
          className="form-control m-1"
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-\d{2}-\d{2}"
          onChange={handleChange}
          value={formData.reservation_date}
        />
        <label htmlFor="reservation_time">Reservation Time:</label>
        <input
          name="reservation_time"
          type="time"
          className="form-control m-1"
          placeholder="HH:MM"
          pattern="[0-9]{2}:[0-9]{2}"
          onChange={handleChange}
          value={formData.reservation_time}
        />
      </div>
    </form>
  );
};
