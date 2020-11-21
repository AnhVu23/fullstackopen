/* eslint-disable import/no-anonymous-default-export */
/**
 * Phone book service
 *
 * @author Anh Vu <anh.vu@vertics.co>
 *
 * @copyright Vertics Oy 2020
 */
import axios from 'axios'

export const getAll = () => {
  return axios
    .get('http://localhost:3001/persons')
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw e
    })
}

export const createOne = (data) => {
  return axios
    .post('http://localhost:3001/persons', data)
    .then((res) => {
      return res
    })
    .catch((e) => {
      throw e
    })
}

export const deleteOne = (id) => {
  return axios
    .delete(`http://localhost:3001/persons/${id}`)
    .then((res) => {
      return res
    })
    .catch((e) => {
      throw e
    })
}
