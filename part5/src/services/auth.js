import axios from 'axios'
import config from '../config/config'
const login = async (data) => {
  const res = await axios.post(`${config.baseUrl}/api/auth`, data)
  window.localStorage.setItem('blogapp_token', res.data.token)
  window.localStorage.setItem(
    'blogapp_user',
    JSON.stringify({
      username: res.data.username,
      name: res.data.name,
      id: res.data.id
    })
  )
  return res
}

const logout = () => {
  window.localStorage.removeItem('blogapp_token')
  window.localStorage.removeItem('blogapp_user')
}

export default {
  login,
  logout,
}
