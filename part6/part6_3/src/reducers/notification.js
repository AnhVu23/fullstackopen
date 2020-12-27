const initialState = {
  message: '',
  isShown: false,
  timeoutId: null
}
const displayNotification = (message, timeout) => {
  return async (dispatch, getState) => {
    if (getState().notification.timeoutId != null) { 
      window.clearTimeout(getState().notification.timeoutId)
    }
    const timeoutId = setTimeout(() => dispatch(removeNotification()), timeout * 1000)
    dispatch({
      type: 'DISPLAY_NOTIFICATION',
      payload: {
        message,
        timeoutId
      },
    })
  }
}

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
        timeoutId: action.payload.timeoutId,
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        message: '',
        isShown: false,
        timeoutId: null
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
