import React, {useState} from "react";

function ReservationForm() {
const [formData, setFormData] = useState({ ...initialFormState})

function handleChange({ target }) {
  setFormData({ ...FormData, [target.name]: target.value });
}

return (
  <form>
    <label htmlFor = "first name">
    First Name:
    <input
    onChange={handleFirstNameChange}
    id="first name"
    type="text"
    name="first name"
    />
      </label> 
  </form>
)
}
