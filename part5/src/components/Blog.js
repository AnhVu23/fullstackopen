import React from 'react'
const Blog = ({ blog, onLikeClick, onDeleteClick }) => {
  const [visible, setVisible] = React.useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const onDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      onDeleteClick(blog.id)
    }
  }

  const currentUser = window.localStorage.getItem('blogapp_user')
  const parsedUser = currentUser ? JSON.parse(currentUser) : null
  return (
    <div style={blogStyle}>
      <div>
        <span>
          {blog.title} {blog.author}
        </span>
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible ? (
        <>
          <p>{blog.url}</p>
          <div>
            <span>likes {blog.likes}</span>
            <button onClick={onLikeClick}>like</button>
          </div>
          <p>{blog.user ? blog.user.name : ''}</p>
          {parsedUser && parsedUser.username === blog.user.username ? (
            <button
              type="button"
              style={{ backgroundColor: 'lightblue' }}
              onClick={onDelete}
            >
              remove
            </button>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
export default Blog
