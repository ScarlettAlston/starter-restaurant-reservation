import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { TableForm } from './TableForm';


export const CreateTable = () => {
  const [formData, setFormData] = useState({
    table_name: "",
    capacity: 1,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      await 
    } catch (error) {
      setErrorMessage(error.message);
    }
  }


  return (
    <div>CreateTable</div>
  )
}
