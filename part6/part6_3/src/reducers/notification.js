const initialState = {
  message: '',
  isShown: false,
}
const displayNotification = (message) => ({
  type: 'DISPLAY_NOTIFICATION',
  payload: {
    message,
  },
})

const removeNotification = () => ({
  type: 'REMOVE_NOTIFICATION',
})
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DISPLAY_NOTIFICATION':
      return {
        ...state,
        message: action.payload.message,
        isShown: true,
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        message: '',
        isShown: false,
      }
    default:
      return state
  }
}

export default reducer

export {
    displayNotification,
    removeNotification,
}
