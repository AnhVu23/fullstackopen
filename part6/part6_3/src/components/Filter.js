import React from 'react'

const Filter = ({
    filter,
    onFilterChange
}) => {
  const handleChange = (event) => {
    onFilterChange(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filter.filter}/>
    </div>
  )
}

export default Filter