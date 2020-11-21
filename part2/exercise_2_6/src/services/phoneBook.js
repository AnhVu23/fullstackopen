/**
 * Phone book service
 *
 * @author Anh Vu <anh.vu@vertics.co>
 *
 * @copyright Vertics Oy 2020
 */
import axios from 'axios'

const getAll = () => {
  axios
    .get('http://localhost:3001/persons')
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw e
    })
}

const createOne = (data) => {
  axios.post('http://localhost:3001/persons', {data})
  .then(res => {
      return res
  })
  .catch((e) => {
    throw e
  })
}

export default {getAll, createOne}
