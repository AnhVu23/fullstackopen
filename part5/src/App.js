import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import authService from './services/auth'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    const user = window.localStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
  }, [])

  const onLogin = async (data) => {
    const res = await authService.login(data)
    setUser({
      username: res.data.username,
        name: res.data.name
    })
  }

  const onLogoutClick = () => {
    authService.logout()
  }

  const renderBlogs = () => (
    <div>
      <h2>Blogs</h2>
      <div>
        <span>{user.name} logged in</span>
        <button onClick={onLogoutClick}>logout</button>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  return (
    <div>
      {user === null ? <Login onLogin={onLogin}/> : renderBlogs()}
    </div>
  )
}

export default App
