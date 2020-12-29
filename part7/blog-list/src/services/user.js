import axios from 'axios'
import config from '../config/config'
const getAll = async () => {
  const res = await axios.get(`${config.baseUrl}/api/users`)
  return res.data
}

export default {
  getAll,
}
