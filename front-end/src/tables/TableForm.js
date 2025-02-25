import React from 'react'

export const TableForm = ({ formData, setFormData }) => {
  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  return (
    <form>
      <div className="form-group">
        <label className="mt-3" htmlFor="table_name">Table Name</label>
        <input
          type="string"
          className="form-control"
          name="table_name"
          onChange={handleChange}
        />
        <label className="mt-3" htmlFor="capacity">Capacity</label>
        <input
          type="integer"
          className="form-control"
          name="capacity"
          onChange={handleChange}
        />
      </div>
    </form>
  )
}
