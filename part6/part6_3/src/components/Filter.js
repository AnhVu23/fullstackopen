import React from 'react'
import {connect} from 'react-redux'
import { updateFilter } from '../reducers/filter'

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

const mapStateToProps = state => ({
  filter: state.filter
})

const mapDispatchToProps = dispatch => ({
  onFilterChange: (filter) => dispatch(updateFilter(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)