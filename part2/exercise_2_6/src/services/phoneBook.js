/* eslint-disable import/no-anonymous-default-export */
/**
 * Phone book service
 *
 * @author Anh Vu <anh.vu@vertics.co>
 *
 * @copyright Vertics Oy 2020
 */
import axios from 'axios'

const baseUrl = 'api/persons'
export const getAll = () => {
  return axios
    .get(baseUrl)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw e
    })
}

export const createOne = (data) => {
  return axios
    .post(baseUrl, data)
    .then((res) => {
      return res
    })
    .catch((e) => {
      throw e
    })
}

export const deleteOne = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((res) => {
      return res
    })
    .catch((e) => {
      throw e
    })
}

export const editOne = (id, data) => {
    return axios
    .put(`${baseUrl}/${id}`, data)
    .then(res => {
        console.log(res)
        return res
    })
    .catch(e => {
        throw e
    })
}