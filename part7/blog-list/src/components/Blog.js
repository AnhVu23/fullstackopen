import React from 'react'
import {Link} from 'react-router-dom'
const Blog = ({blog}) => {
  const blogStyle = {
    border: 'solid',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
    display: 'flex',
    flex: 1,
    padding: '10px 2px'
  }

  return (
    <Link style={blogStyle} to={`/blogs/${blog.id}`}>
        <span className="blog-title">
          {blog.title} {blog.author}
        </span>
    </Link>
  )
}
export default Blog
