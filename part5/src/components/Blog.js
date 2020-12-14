import React from 'react'
const Blog = ({ blog, onLikeClick }) => {
  const [visible, setVisible] = React.useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
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
        </>
      ) : null}
    </div>
  )
}
export default Blog
