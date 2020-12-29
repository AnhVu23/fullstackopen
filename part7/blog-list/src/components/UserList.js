import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/user'

const User = ({ user }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Link to={`/users/${user.id}`} style={{ width: '100px' }}>
        {user.name}
      </Link>
      <span>{user.blogs.length}</span>
    </div>
  )
}

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.user.users)
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])
  return (
    <div>
      <h2>Users</h2>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '100px' }} />
        <strong>blogs created</strong>
      </div>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  )
}

export default UserList
