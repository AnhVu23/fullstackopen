import React from 'react'

import {Button, Link} from '@material-ui/core'
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
    <Button style={blogStyle} href={`/blogs/${blog.id}`} component={Link}>
        <span className="blog-title">
          {blog.title} {blog.author}
        </span>
    </Button>
  )
}
export default Blog
