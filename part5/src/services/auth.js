import axios from 'axios'
import config from '../config/config'
const login = async (data) => {
    const res = await axios.post(`${config.baseUrl}/api/auth`, data)
    window.localStorage.setItem('token', res.data.token)
    window.localStorage.setItem('user', JSON.stringify({
        username: res.data.username,
        name: res.data.name
    }))
    return res
}

const logout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
}

export default {
    login,
    logout,
}