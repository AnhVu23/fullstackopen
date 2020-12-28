import auth from '../services/auth'
const initialState = {
  username: '',
  name: '',
  id: '',
}

const login = (data) => {
  return async (dispatch) => {
    const res = await auth.login(data)
    console.log(res)
    dispatch(saveUser({
        id: res.data.id,
        name: res.data.name,
        username: res.data.username,
    }))
    return res
  }
}

const saveUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'SAVE_USER',
      payload: {
          ...user
      }
    })
  }
}

const logout = () => {
  return async (dispatch) => {
    await auth.logout()
    dispatch({
      type: 'LOGOUT',
    })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      return { ...state, ...action.payload }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export default reducer

export { login, logout, saveUser }
