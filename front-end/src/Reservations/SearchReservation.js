import React from 'react'

const SearchReservation = () => {



  return (
    <div>
      <h2 class="display-6"> Search </h2>
      <label htmlFor="search_for_reservation" className="mt-2"> <strong>Search For A Reservation</strong></label>
      <div className="row g-3">
        <div className="d-flex col-md-6">
          <input
            type="string"
            name="mobile_number"
            className="mr-0 form-control"
            placeholder="Enter a customer's phone number"
            aria-label="Reservation phonenumber"
            aria-describedby="button-addon2" />
          <button
            className="ml-0 btn btn-outline-secondary"
            type="button"
            id="button-addon2">
            Find
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchReservation