import axios from 'axios'
import config from '../config/config'

const getAll = async () => {
  const res = await axios.get(`${config.baseUrl}/api/blogs`)
  return res.data
}

const createOne = async (data) => {
  const res = await axios.post(`${config.baseUrl}/api/blogs`, data, 
  {headers: {
    authorization: `bearer ${window.localStorage.getItem('blogapp_token')}`
  }})
  return res.data
}

const updateOne = async (id, data) => {
  const res = await axios.put(`${config.baseUrl}/api/blogs/${id}`, data, 
  {headers: {
    authorization: `bearer ${window.localStorage.getItem('blogapp_token')}`
  }})
  return res.data
}

export default { getAll, createOne, updateOne }