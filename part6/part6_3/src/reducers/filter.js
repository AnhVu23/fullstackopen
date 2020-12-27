const initialState = {
  filter: '',
}
const updateFilter = (filter) => ({
  type: 'UPDATE_FILTER',
  payload: {
    filter,
  },
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return {
        ...state,
        filter: action.payload.filter,
      }
    default:
      return state
  }
}

export default reducer

export { updateFilter }
