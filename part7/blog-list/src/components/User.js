import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllUsers} from '../reducers/user'

const User = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const selectedUser = useSelector((state) => {
    return state.user.users.find((user) => user.id === id)
  })
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])
  if (!selectedUser) return null
  return (
    <div>
      <h2>{selectedUser.name}</h2>
      <strong>added blogs</strong>
      <ul>
        {selectedUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
