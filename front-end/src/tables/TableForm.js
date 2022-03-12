import React from 'react'

export const TableForm = () => {


  return (
    <form>
      <div className="form-group">
        <label htmlFor="table_name">Table Name</label>
        <input
          type="string"
          className="form-control"
          name="table_name"
          onChange={handleChange}
        />
        <label htmlFor="capacity">Capacity</label>
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
