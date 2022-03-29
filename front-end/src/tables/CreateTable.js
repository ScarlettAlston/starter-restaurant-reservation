import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { createTable } from '../utils/api';
import { TableForm } from './TableForm';


const CreateTable = () => {
  const [formData, setFormData] = useState({
    table_name: "",
    capacity: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const parsedData = { ...formData, capacity: Number(formData.capacity) }
      await createTable(parsedData).then(() => {
        history.push("/dashboard")
      })
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleCancel() {
    history.goBack()
  }


  return (
    <div>
      <h2>Create Table</h2>
      {errorMessage && (
        <h5 className="alert alert-danger mx-1">{errorMessage}</h5>
      )}
      <TableForm formData={formData} setFormData={setFormData} />
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
  );
}

export default CreateTable;