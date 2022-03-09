import React from "react";

const ReservationForm = ({ newRestaurant, setNewRestaurant }) => {
  function handleChange({ target }) {
    setNewRestaurant({...newRestaurant, [target.name]: target.value });
  }

  return (
    <form>
      <div className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input type="string" className="form-control" id="first_name" onChange={handleChange}/>
        <label htmlFor="last_name">Last Name</label>
        <input type="string" className="form-control" id="last_name" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="mobile_number">Mobile Number:</label>
        <input type="string" className="form-control" id="mobile_number" onChange={handleChange} />
        <label htmlFor="people">Party Size:</label>
        <input type="integer" className="form-control" id="people" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_date">Reservation Date:</label>
        <input type="date" className="form-control" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}" onChange={handleChange} />
        <label htmlFor="reservation_time">Reservation Time:</label>
        <input type="time" className="form-control" placeholder="HH:MM" pattern="[0-9]{2}:[0-9]{2}" onChange={handleChange} />
      </div>
    </form>
  )

}

export default ReservationForm;
