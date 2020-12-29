import auth from '../services/auth'
import user from '../services/user'
const initialState = {
  username: '',
  name: '',
  id: '',
  users: [],
}

const login = (data) => {
  return async (dispatch) => {
    const res = await auth.login(data)
    console.log(res)
    dispatch(
      saveUser({
        id: res.data.id,
        name: res.data.name,
        username: res.data.username,
      })
    )
    return res
  }
}

const saveUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'SAVE_USER',
      payload: {
        ...user,
      },
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

const getAllUsers = () => {
  return async (dispatch) => {
    const users = await user.getAll()
    dispatch({
      type: 'GET_USERS',
      payload: {
        data: users,
      },
    })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        username: action.payload.username,
      }
    case 'LOGOUT':
      return initialState
    case 'GET_USERS':
      return { ...state, users: action.payload.data }
    default:
      return state
  }
}

export default reducer

export { login, logout, saveUser, getAllUsers }
