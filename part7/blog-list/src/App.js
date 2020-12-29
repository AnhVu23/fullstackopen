import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Link, AppBar, Toolbar, Typography } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogCreate from './components/BlogCreate'
import Toggle from './components/Toggle'
import UserList from './components/UserList'
import User from './components/User'
import BlogView from './components/BlogView'

// Style
import './App.css'
import { displayNotification } from './reducers/notification'
import { createBlog, getAllBlogs } from './reducers/blog'
import { login, logout, saveUser } from './reducers/user'

const App = () => {
  const blogs = useSelector((state) => state.blog.blogs)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const successMessage = useSelector((state) => state.notification.message)
  const [errorMessage, setErrorMessage] = useState(null)

  const createBlogRef = React.useRef()

  useEffect(() => {
    getBlogs()
    const user = window.localStorage.getItem('blogapp_user')
    if (user) {
      dispatch(saveUser(JSON.parse(user)))
    }
  }, [])

  const getBlogs = async () => {
    await dispatch(getAllBlogs())
  }

  const onLogin = async (data) => {
    try {
      await dispatch(login(data))
    } catch (e) {
      setErrorMessage(e.response.data.error)
      setTimeout(() => setErrorMessage(null), 20000)
    }
  }

  const onLogoutClick = () => {
    dispatch(logout())
  }

  const onBlogCreate = async (data) => {
    try {
      createBlogRef.current.toggleVisibility()
      const newBlog = await dispatch(createBlog(data))
      dispatch(
        displayNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`
        ),
        2
      )
    } catch (e) {
      setErrorMessage(e.response.data.error)
      setTimeout(() => setErrorMessage(null), 2000)
    }
  }

  const renderBlogs = () => (
    <div>
      <Toggle buttonLabel="new note" ref={createBlogRef}>
        <BlogCreate onBlogCreate={onBlogCreate} />
      </Toggle>
      <div style={{ height: 20 }} />
      {blogs
        .sort((prevBlog, nextBlog) => nextBlog.likes - prevBlog.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )

  const renderNav = () => {
    return (
      <AppBar position='static'
        style={{
          backgroundColor: 'gray',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Toolbar>
          <Button color='inherit' component={Link} href='/'>
            blogs
          </Button>
          <Button color='inherit' component={Link} href='/users'>
            users
          </Button>
        </Toolbar>
        

          <Typography variant='body1' component='span' gutterBottom>{user.name} logged in</Typography>
          <Button onClick={onLogoutClick} color='inherit'>logout</Button>
        
      </AppBar>
    )
  }

  return user.id !== '' ? (
    <Router>
      <div>
        {errorMessage !== null ? (
          <div className="error-message">
            <span className="error-message-text">{errorMessage}</span>
          </div>
        ) : null}
        {renderNav()}
        <Typography component='h2' variant='h2'>blog app</Typography>
        <Switch>
          <Route exact path="/">
            {renderBlogs()}
          </Route>
          <Route exact path="/users">
            <UserList />
          </Route>
          <Route exact path="/users/:id">
            <User />
          </Route>
          <Route path="/blogs/:id">
            <BlogView />
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <Router>
      <div>
        {errorMessage !== null ? (
          <div className="error-message">
            <span className="error-message-text">{errorMessage}</span>
          </div>
        ) : null}
        <Switch>
          <Route path="/">
            <Login onLogin={onLogin} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
