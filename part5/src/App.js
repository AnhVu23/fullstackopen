import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogCreate from './components/BlogCreate'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import authService from './services/auth'
// Style
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const createBlogRef = React.useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    const user = window.localStorage.getItem('blogapp_user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const onLogin = async (data) => {
    try {
      const res = await authService.login(data)
      setUser({
        username: res.data.username,
        name: res.data.name,
      })
    } catch (e) {
      setErrorMessage(e.response.data.error)
      setTimeout(() => setErrorMessage(null), 2000)
    }
  }

  const onLogoutClick = () => {
    authService.logout()
    setUser(null)
  }

  const onBlogCreate = async (data) => {
    try {
      createBlogRef.current.toggleVisibility()
      const newBlog = await blogService.createOne(data)
      setBlogs([...blogs, newBlog])
      setSuccessMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
      setTimeout(() => setSuccessMessage(null), 2000)
    } catch (e) {
      setErrorMessage(e.response.data.error)
      setTimeout(() => setErrorMessage(null), 2000)
    }
  }

  const renderBlogs = () => (
    <div>
      {successMessage !== null ? (
        <div className="success-message">
          <span className="success-message-text">{successMessage}</span>
        </div>
      ) : null}
      <h2>Blogs</h2>
      <div>
        <span>{user.name} logged in</span>
        <button onClick={onLogoutClick}>logout</button>
      </div>
      <Toggle buttonLabel='new note'
              ref={createBlogRef}
      >
        <BlogCreate onBlogCreate={onBlogCreate} />
      </Toggle>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  return (
    <div>
      {errorMessage !== null ? (
        <div className="error-message">
          <span className="error-message-text">{errorMessage}</span>
        </div>
      ) : null}
      {user === null ? <Login onLogin={onLogin} /> : renderBlogs()}
    </div>
  )
}

export default App
